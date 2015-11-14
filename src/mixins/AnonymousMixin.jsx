"use strict";

var AnonymousMixin = {
	statics: {
		willTransitionTo: function(transition){
			//TODO - get logged in user
			user = false;
			
			if(user) {
				transition.redirect("/");
			}
		}
	},
};

module.exports = AnonymousMixin;