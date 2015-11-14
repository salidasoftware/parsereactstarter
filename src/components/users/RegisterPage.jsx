"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RegisterForm = require('./RegisterForm');
var AnonymousMixin = require('../../mixins/AnonymousMixin');
var toastr = require('toastr');

var RegisterPage = React.createClass({
	
	mixins: [Router.Navigation, AnonymousMixin],

	componentWillMount: function() {
		
	},
	
	getInitialState: function() {
		return {
			credentials: { email: '', password: '', password_confirmation: '' },
			errors: {}
		};
	},
	
	registerFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {};
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
		
		var _this = this;
		
		toastr.error("Registration not implemeted yet!");
		
		//TODO create user and then if successful
		//toastr.success("Registration successful.");
		//_this.transitionTo('login');
					
		//if failed
		//toastr.error("Registration failed. "+error);
		//this.setState({errors: this.state.errors});
		
	},
	
	setCredentialsState: function() {
		var field = event.target.name;
		var value = event.target.value;
		this.state.credentials[field] = value;
		return this.setState({credentials: this.state.credentials});
	},
		
	render: function() {
		return (
			<div>
				<RegisterForm
					credentials={this.state.credentials}
					onRegister={this.register}
					onChange={this.setCredentialsState}
					errors={this.state.errors} />
			</div>
		);
	}
});

module.exports = RegisterPage;