"use strict";

var React = require('react');
var Router = require('react-router');
var UserMixin = require('../../mixins/UserMixin');

var LogoutPage = React.createClass({
	
	mixins: [UserMixin, Router.Navigation],

	componentWillMount: function() {
		//logout comes from UserMixin
		this.logout();
		this.transitionTo('login');
	},
	
	render: function() {
		return (
			<div>
				Logging out...
			</div>
		);
	}
});

module.exports = LogoutPage;