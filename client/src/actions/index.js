import axios from 'axios';

export const SUBMIT_WEBSITE = 'SUBMIT_WEBSITE';
export const GET_TOKEN = 'GET_TOKEN';
export const GET_WEBSITES = 'GET_WEBSITES';

export function submitWebsite(values, token) {
	return dispatch => {
		return axios.post('/website/add',
							values,
							{ headers: {
								"Authorization": token
							}})
		.then(res => {
			return dispatch(getWebsites(token));
		})
		.catch(err => console.log(err));
	}
}

export function login(values) {
	return dispatch => {
		return axios.post('/users/login', values)
		.then(res => {
			if(res.status === 200) {
				dispatch(getToken(res.data.token));
			}
		})
		.catch(err => console.log(err));
	}
}

export function getToken(token) {
	return {
		type: GET_TOKEN,
		token
	}
}

export function getWebsites(token) {
	return dispatch => {
		return axios.get('/website/list',
							{ headers: {
								"Authorization": token
							}})
		.then(res => {
			return dispatch(mapWebsitesToProps(res.data))
		})
		.catch(err => console.log(err));
	}
}

export function mapWebsitesToProps(websites) {
	return {
		type: GET_WEBSITES,
		websites
	}
}