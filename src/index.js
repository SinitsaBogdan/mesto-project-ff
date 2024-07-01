import * as Card from './scripts/card';
import * as Modal from './scripts/modal';
import { enableValidation, clearValidation } from './scripts/vadidations';
import * as api from './scripts/api';
// import { initialCards } from './data/data-cards';
import './styles/index.css';

// TODO: проблема с точками
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: '.popup__input_type_error',
	formFiledErrorClass: '.popup__form_field-error',
	errorClass: '.popup__error_visible',
};

const modals = document.querySelectorAll('.popup');
const cardList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const btnProfileEdit = document.querySelector('.profile__edit-button');
const btnCardAdd = document.querySelector('.profile__add-button');

const dialogEdit = document.querySelector('.popup_type_edit');
const dialogAdd = document.querySelector('.popup_type_new-card');

const dialogCardView = document.querySelector('.popup_type_image');
const dialogCardViewImage = dialogCardView.querySelector('.popup__image');
const dialogCardViewCaption = dialogCardView.querySelector('.popup__caption');

const formEdit = document.forms.edit_profile;
const formAdd = document.forms.new_place;

// --------------------------------------------------------------------------

api.getProfile()
	.then((result) => {
		profileTitle.textContent = result.name;
		profileDescription.textContent = result.about;
		profileAvatar.src = result.avatar;
	})
	.catch((err) => console.error('Ошибка при получении профиля:', err));

api.getCards()
	.then((cards) => {
		cards.forEach((card) => {
			cardList.append(Card.create(card, Card.remove, Card.liked, openDialogCardView, dialogCardView));
			console.log(card);
		});
	})
	.catch((err) => console.error('Ошибка при получении карточек:', err));

// --------------------------------------------------------------------------

function openDialogProfileEdit(modal, form, profileTitle, profileDescription) {
	Modal.open(modal);
	clearValidation(form, validationConfig);
	form.name.value = profileTitle.textContent;
	form.description.value = profileDescription.textContent;
}

function saveDialogProfileEdit(event, form, title, description) {
	const dialog = Modal.searchOpenDialog();
	const name = form.name.value;
	const about = form.description.value;
	event.preventDefault();
	title.textContent = name;
	description.textContent = about;
	api.patchProfile(name, about);
	form.reset();
	Modal.close(dialog);
}

function openDialogCardAdd(modal, form) {
	form.reset();
	clearValidation(form, validationConfig);
	Modal.open(modal);
}

function saveDialogCardAdd(event, form, list, create) {
	const dialog = Modal.searchOpenDialog();
	const card = {
		name: form.name.value,
		link: form.link.value,
	};
	event.preventDefault();
	list.insertBefore(create(card, Card.remove, Card.liked, openDialogCardView, dialogCardView), list.firstElementChild);
	api.postCard(card.name, card.link);
	form.reset();
	Modal.close(dialog);
}

function openDialogCardView(evt, dialog) {
	const card = evt.target.closest('.card');
	const cardTitle = card.querySelector('.card__title').textContent;
	const cardScr = card.querySelector('.card__image').src;
	dialogCardViewImage.src = cardScr;
	dialogCardViewImage.alt = cardTitle;
	dialogCardViewCaption.textContent = cardTitle;
	clearValidation(form, validationConfig);
	Modal.open(dialog);
}

// --------------------------------------------------------------------------

modals.forEach((el) => {
	el.addEventListener('mousedown', (event) => {
		if (event.target.classList.contains('popup_is-opened')) Modal.close(el);
		if (event.target.classList.contains('popup__close')) Modal.close(el);
	});
});

btnProfileEdit.addEventListener('click', () => {
	const args = [dialogEdit, formEdit, profileTitle, profileDescription];
	openDialogProfileEdit(...args);
});

btnCardAdd.addEventListener('click', () => {
	const args = [dialogAdd, formAdd];
	openDialogCardAdd(...args);
});

formEdit.addEventListener('submit', (event) => {
	const args = [event, formEdit, profileTitle, profileDescription];
	saveDialogProfileEdit(...args);
});

formAdd.addEventListener('submit', function (event) {
	const args = [event, formAdd, cardList, Card.create, Card.remove];
	saveDialogCardAdd(...args);
});

enableValidation(validationConfig);
