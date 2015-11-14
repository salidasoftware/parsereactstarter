"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var History = require('react-router').History;
var RegisterForm = require('./RegisterForm');
var AnonymousMixin = require('../../mixins/AnonymousMixin');
var toastr = require('toastr');
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

var RegisterPage = React.createClass({
	
	mixins: [History, AnonymousMixin],

	componentWillMount: function() {
		UserStore.addActionListener(UserActions.types.USER_REGISTERING, this._onRegistering);
        UserStore.addActionListener(UserActions.types.USER_REGISTERED, this._onRegistered);
        UserStore.addActionListener(UserActions.types.USER_REGISTER_ERROR, this._onRegisterError);
	},
    
    componentWillUnmount: function() {
		UserStore.removeActionListener(UserActions.types.USER_REGISTERING, this._onRegistering);
        UserStore.removeActionListener(UserActions.types.USER_REGISTERED, this._onRegistered);
        UserStore.removeActionListener(UserActions.types.USER_REGISTER_ERROR, this._onRegisterError);
	},
    
    _onRegistering: function() {
		this.setState({registering: true});
	},
    
    _onRegistered: function() {
        this.setState({registering: false});
		//toastr.success("Welcome!");
        this.history.pushState(null, '/');
	},
    
    _onRegisterError: function() {
		this.state.errors.signup = UserStore.getRegisterError();
        this.setState({errors: this.state.errors, registering: false});	
	},
	
	getInitialState: function() {
		return {
            registering: false,
			credentials: { email: '', password: '', password_confirmation: '' },
			errors: {}
		};
	},
	
	registerFormIsValid: function() {
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
		if(this.state.credentials.password != this.state.credentials.password_confirmation) {
			this.state.errors.password_confirmation = 'Passwords don\'t match';
			formIsValid = false;
		}
		this.setState({errors: this.state.errors});
		return formIsValid;		
	},
	
	register: function(event) {
		event.preventDefault();
		if(!this.registerFormIsValid()){
			return;
		}
        UserActions.register(this.state.credentials);
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
				<RegisterForm
                    registering={this.state.registering}
					credentials={this.state.credentials}
					onRegister={this.register}
					onChange={this.setCredentialsState}
					errors={this.state.errors} />
			</div>
		);
	}
});

module.exports = RegisterPage;