import apiUrl from '../apiConfig'
import axios from 'axios'

// my profile show
export const myProfile = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/my-profile',
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// add game to collection
export const addToCollection = (user, gameId) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/games/mylibrary/' + gameId,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}


// remove from my collection
export const removeFromCollection = (user, gameId) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/games/mylibrary/remove/' + gameId,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// set as favorite
export const setAsFavorite = (user, gameId) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/games/myfavorite/' + gameId,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const editPlatform = (user, platform) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/platforms/' + platform._id,
        data: {
            platform: platform
        },
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const deletePlatform = (user, platformId) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/platforms/' + platformId,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const addPlatform = (user, platform) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/platforms/',
        data: {
            platform: platform
        },
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const viewProfile = (user, otherUsername ) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/profile/' + otherUsername,
        headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}