const token = '4f72bdac-4a32-447e-a47f-4588193b59b1';
const groupId = 'wff-cohort-18';
const server = 'https://mesto.nomoreparties.co/';

export const getProfile = async () => {
	const res = await fetch(`${server}v1/${groupId}/users/me`, {
		headers: {
			authorization: token,
		},
	});
	return await res.json();
};

export const getCards = async () => {
	const res = await fetch(`${server}v1/${groupId}/cards`, {
		headers: {
			authorization: token,
		},
	});
	return await res.json();
};

export const patchProfile = async (name, about) => {
	const res = await fetch(`${server}v1/${groupId}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			about: about,
		}),
	});
	return await res.json();
};

export const postCard = async (name, link) => {
	const res = await fetch(`${server}v1/${groupId}/cards`, {
		method: 'POST',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			link: link,
		}),
	});
	return await res.json();
};

export const deleteCard = async (cardId) => {
	const res = await fetch(`${server}v1/${groupId}/cards/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: token,
			'Content-Type': 'application/json',
		},
	});
	return await res.json();
};

// 6683182a889c8e0019f007e2
