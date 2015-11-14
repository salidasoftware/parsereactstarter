"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LoginForm = require('./LoginForm');
var AnonymousMixin = require('../../mixins/AnonymousMixin');
var toastr = require('toastr');

var LoginPage = React.createClass({
	
	mixins: [Router.Navigation, AnonymousMixin],

	componentWillMount: function() {
		
	},
	
	getInitialState: function() {
		return {
			credentials: { email: '', password: '' },
			errors: {}
		};
	},
	
	login: function(event) {
		event.preventDefault();
		var _this = this;
		
		toastr.error("Login not implemeted yet!");
		
		//TODO, login and then:
		// _this.transitionTo('app');
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
				<LoginForm
					credentials={this.state.credentials}
					onLogin={this.login}
					onChange={this.setCredentialsState}
					errors={this.state.errors} />
				<Link to="/register" className="">Need to Register?</Link>
			</div>
		);
	}
});

module.exports = LoginPage;