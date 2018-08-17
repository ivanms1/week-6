import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions';

let LoginForm = ({handleSubmit, login}) => {
	function handleLogin(values){
		login(values)
	}
	return(
		<form className="login-form" onSubmit={handleSubmit(handleLogin)}>
			<h1>Website Monitor</h1>
			<div>
				<label htmlFor="email"></label>
				<Field  name="email"
						props={{ className: "input" }}
						component="input"
						type="text"/>
			</div>
			<div>
				<label htmlFor="password"></label>
				<Field  name="password"
						props={{ className: "input" }}
						component="input" 
						type="password"/>
			</div>
			<button type="submit">Login</button>
		</form>
		)
}

LoginForm = reduxForm({
	form: 'login'
})(LoginForm)

LoginForm = connect(null, {login})(LoginForm)

export default LoginForm;