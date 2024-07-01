export const enableValidation = (settings) => {
	const list = Array.from(document.querySelectorAll(settings.formSelector));
	list.forEach((form) => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(form, settings);
	});
};

export const clearValidation = (form, settings) => {
	const errorList = Array.from(form.querySelectorAll(settings.formFiledErrorClass));
	const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
	const button = form.querySelector(settings.submitButtonSelector);
	toggleButtonState(inputList, button, settings);
	errorList.forEach((error) => {
		error.classList.remove(settings.errorClass);
		error.textContent = '';
	});
	inputList.forEach((input) => input.classList.remove(settings.inputErrorClass));
};

const setEventListeners = (form, settings) => {
	const list = Array.from(form.querySelectorAll(settings.inputSelector));
	const button = form.querySelector(settings.submitButtonSelector);
	toggleButtonState(list, button, settings);
	list.forEach((input) => {
		input.addEventListener('input', function () {
			checkInputValidity(settings, form, input);
			toggleButtonState(list, button, settings);
		});
	});
};

const checkInputValidity = (settings, form, input) => {
	if (input.validity.valueMissing) input.setCustomValidity(input.dataset.errorEmpty);
	else if (input.validity.patternMismatch) input.setCustomValidity(input.dataset.errorPattern);
	else if (input.validity.typeMismatch) input.setCustomValidity(input.dataset.errorType);
	else input.setCustomValidity('');
	if (!input.validity.valid) showInputError(form, input, input.validationMessage, settings);
	else hideInputError(form, input, settings);
};

const showInputError = (form, input, errorMessage, settings) => {
	const errorElement = form.querySelector(`#${input.id}-error`);
	input.classList.add(settings.inputErrorClass);
	errorElement.classList.add(settings.errorClass);
	errorElement.textContent = errorMessage;
};

const hideInputError = (form, input, settings) => {
	const errorElement = form.querySelector(`#${input.id}-error`);
	input.classList.remove(settings.inputErrorClass);
	errorElement.classList.remove(settings.errorClass);
	errorElement.textContent = '';
};

const hasInvalidInput = (list) => {
	return list.some((input) => {
		return !input.validity.valid;
	});
};

const toggleButtonState = (list, button, settings) => {
	if (hasInvalidInput(list)) button.classList.add(settings.inactiveButtonClass);
	else button.classList.remove(settings.inactiveButtonClass);
};
