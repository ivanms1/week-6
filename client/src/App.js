import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LoginForm from './components/login';
import Dashboard from './components/dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
    	<Router>
		    <div className="App">
			    <Route exact path="/" render={() => (
			    	this.props.loggedIn ? (
			    		<Redirect to="/dashboard"/>
			    		) : (
			    		<LoginForm/>
			    		)
			    	)} />
		    	<Route path="/dashboard" render={() => (
		    		this.props.loggedIn ? (
		    			<Dashboard/>
		    			) : (
		    			<Redirect exact to="/"/>
		    			)
		    		)} />
		    </div>
     	</Router>
    );
  }
}

function mapStateToProps (state) {
	return {
		loggedIn: state.userData.loggedIn
	}
}

export default connect(mapStateToProps, null)(App);
