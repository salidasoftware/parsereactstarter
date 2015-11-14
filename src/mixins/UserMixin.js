"use strict";

var UserStore = require('../stores/userStore');

var UserMixin = {

    componentWillMount: function() {
        this.setUserState();
		UserStore.addChangeListener(this._onChange);
	},
    
    _onChange: function() {
         this.setUserState(); 
    },
	
    getInitialState: function() {
		return {
            user: null,
			authenticated: false
		};
	},
    
	setUserState: function(context) {
		var user = UserStore.getCurrentUser();
		this.setState({user: user, authenticated: user != null});
	},
	
	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	}
};

module.exports = UserMixin;