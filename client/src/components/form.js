import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitWebsite } from '../actions';

let WebsiteForm = ({ handleSubmit, submitWebsite, token }) => {
	function sendWebsite(values) {
		submitWebsite(values, token);
	}
	return (
		<form onSubmit={handleSubmit(sendWebsite)}>
			<h2>Add a website</h2>
			<div>
				<label htmlFor="name">Name</label>
				<Field name="name"
					   props={{ className: "input" }}
					   component="input"
					   type="text"/>
			</div>
			<div>
				<label htmlFor="url">URL</label>
				<Field name="url"
					   props={{ className: "input" }}
					   component="input"
					   type="text"/>
			</div>
			<button type="submit">Add</button>
		</form>
		)
}

WebsiteForm = reduxForm({
	form: 'website'
})(WebsiteForm)

WebsiteForm = connect(
	state => ({
		token: state.userData.token
	}),
	{ submitWebsite }
	)(WebsiteForm)

export default WebsiteForm;