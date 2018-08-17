import { combineReducers } from 'redux';
import userData from './userReducer.js';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
	userData,
	form: formReducer
});