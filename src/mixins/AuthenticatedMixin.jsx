"use strict";

var AuthenticatedMixin = {
	statics: {
		willTransitionTo: function(transition){
			//TODO - get logged in user
			user = false;
			
			if(!user) {
				transition.redirect("login");
			}
		}
	}
};

module.exports = AuthenticatedMixin;