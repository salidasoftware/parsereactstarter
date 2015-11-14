"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var History = require('react-router').History;
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');

var LogoutPage = React.createClass({
	
	mixins: [History],
    
    componentWillMount: function() {
		UserStore.addActionListener(UserActions.types.USER_LOGGING_OUT, this._onLoggingOut);
        UserStore.addActionListener(UserActions.types.USER_LOGGED_OUT, this._onLoggedOut);
        UserActions.logout();
	},
    
    componentWillUnmount: function() {
		UserStore.removeActionListener(UserActions.types.USER_LOGGING_OUT, this._onLoggingOut);
        UserStore.removeActionListener(UserActions.types.USER_LOGGED_OUT, this._onLoggedOut);
	},
    
    _onLoggingOut: function() {
		
	},
    
    _onLoggedOut: function() {
        this.history.pushState(null, '/');
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