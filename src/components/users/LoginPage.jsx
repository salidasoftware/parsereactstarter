"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var History = require('react-router').History;
var LoginForm = require('./LoginForm');
var AnonymousMixin = require('../../mixins/AnonymousMixin');
var toastr = require('toastr');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

var LoginPage = React.createClass({
	
	mixins: [History, AnonymousMixin],

	componentWillMount: function() {
		UserStore.addActionListener(UserActions.types.USER_LOGGING_IN, this._onLoggingIn);
        UserStore.addActionListener(UserActions.types.USER_LOGGED_IN, this._onLoggedIn);
        UserStore.addActionListener(UserActions.types.USER_LOGIN_ERROR, this._onLoginError);
	},
    
    componentWillUnmount: function() {
		UserStore.removeActionListener(UserActions.types.USER_LOGGING_IN, this._onLoggingIn);
        UserStore.removeActionListener(UserActions.types.USER_LOGGED_IN, this._onLoggedIn);
        UserStore.removeActionListener(UserActions.types.USER_LOGIN_ERROR, this._onLoginError);
	},
    
    _onLoggingIn: function() {
		this.setState({loggingIn: true});
	},
    
    _onLoggedIn: function() {
        this.setState({loggingIn: false});
        this.history.pushState(null, '/');
	},
    
    _onLoginError: function() {
		this.state.errors.login = UserStore.getLoginError();
        this.setState({errors: this.state.errors, loggingIn: false});	
	},
	
	getInitialState: function() {
		return {
            loggingIn: false,
			credentials: { email: '', password: '' },
			errors: {}
		};
	},
    
    loginFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {};
        if(this.state.credentials.email.length == 0) {
			this.state.errors.email = 'Email is required';
			formIsValid = false;
		}
		if(this.state.credentials.password.length < 3) {
			this.state.errors.password = 'Password too short';
			formIsValid = false;
		}
		this.setState({errors: this.state.errors});
		return formIsValid;		
	},
	
	login: function(event) {
		event.preventDefault();
        if(!this.loginFormIsValid()){
			return;
		}
		UserActions.login(this.state.credentials);
	},
	
	setCredentialsState: function(event) {
		var field = event.target.name;
		var value = event.target.value;
		this.state.credentials[field] = value;
		return this.setState({credentials: this.state.credentials});
	},
		
	render: function() {
		return (
			<div>
				<LoginForm
                    loggingIn={this.state.loggingIn}
					credentials={this.state.credentials}
					onLogin={this.login}
					onChange={this.setCredentialsState}
					errors={this.state.errors} />				
                
                <div className="callout panel text-center">
                    <Link to="/register" className="">Need to sign up instead?</Link>
                </div>
                
			</div>
		);
	}
});

module.exports = LoginPage;