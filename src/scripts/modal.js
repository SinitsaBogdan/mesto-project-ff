const classSelectorPopUpOpened = '.popup_is-opened';
const nameSelectorPopUpOpened = classSelectorPopUpOpened.slice(1);
let dialog;

// --------------------------------------------------------------------------

function closeDialogToKeyDownEsc(event) {
	if (event.key === 'Escape') {
		dialog = searchOpenDialog();
		close(dialog);
	}
}

// --------------------------------------------------------------------------

export function open(dialog) {
	dialog.classList.add(nameSelectorPopUpOpened);
	document.addEventListener('keydown', closeDialogToKeyDownEsc);
}

export function close(dialog) {
	dialog.classList.remove(nameSelectorPopUpOpened);
	document.removeEventListener('keydown', closeDialogToKeyDownEsc);
}

export function searchOpenDialog() {
	return document.querySelector(classSelectorPopUpOpened);
}
