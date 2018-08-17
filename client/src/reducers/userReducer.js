import { GET_TOKEN, GET_WEBSITES } from '../actions';

let initialState = {
	token: null,
	loggedIn: false,
	websites: []
}

const userData = (
	state = initialState,
	action) => {
	switch (action.type) {
		case GET_TOKEN:
			return state ={ ...state, token: action.token, loggedIn: true };
		case GET_WEBSITES:
			return state ={ ...state, websites: action.websites };	
		default:
			return state;
	}
}

export default userData;
