"use strict";

var UserMixin = {

	logout: function() {
		//TODO
	},

	setUserState: function(context) {
		//TODO
		var user = null;
		this.setState({user: user, authenticated: user != null});
	},

	componentWillMount: function() {
		this.setUserState();
		//TODO - attach listener to call this.setUserState if user login state changes
	},
	
	componentWillUnmount: function() {
		//TODO - detach listener for user login state
	}
};

module.exports = UserMixin;