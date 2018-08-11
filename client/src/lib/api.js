import { handleApiErrors } from './api-errors'

const removeJWT = (token) => {
	return token.slice(4)
}

export const fetchAPI = function(URL, options) {
	return fetch(URL, options)
	.then(handleApiErrors)
	.then(response => response.json())
	.then(json => json)
	.catch(error => { throw error });
}

export const options = function(method, user, item) {
	return {
		method: method,
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${removeJWT(user.token)}`
		},
		body: JSON.stringify({
			user,
			...item
		})
	}
}

export const optionsGet = function(user) {
	return {
		method: 'GET',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${removeJWT(user.token)}`
		}
	}
}

export const optionsPost = function(user) {
	return {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...user
		})
	}
}
