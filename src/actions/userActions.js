"use strict";

var Dispatcher = require('../dispatcher');
var UserApi = require('../api/userApi');
var keyMirror = require('keyMirror');

var UserActions = {
    
    types: keyMirror({
        USER_REGISTERING: null,
        USER_REGISTERED: null,
        USER_REGISTER_ERROR: null,
        USER_LOGGING_IN: null,
        USER_LOGGED_IN: null,
        USER_LOGIN_ERROR: null,
        USER_LOGGING_OUT: null,
        USER_LOGGED_OUT: null,
    }),
    
	register: function(credentials) {
        
        var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.USER_REGISTERING
		});
        
        UserApi.register(credentials)
        .then(function(user){
            Dispatcher.dispatch({
                actionType: _this.types.USER_REGISTERED,
                user: user
            });
        })
        .catch(function(error){            
            Dispatcher.dispatch({
                actionType: _this.types.USER_REGISTER_ERROR,
                error: error.message
            });
        });
	},
	login: function(credentials) {
		var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.USER_LOGGING_IN
		});
        
		UserApi.login(credentials)
        .then(function(user){
            Dispatcher.dispatch({
                actionType: _this.types.USER_LOGGED_IN,
                user: user
            });
        })
        .catch(function(error){
            Dispatcher.dispatch({
                actionType: _this.types.USER_LOGIN_ERROR,
                error: error.message
            });
        });
	},	
	logout: function() {
		var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.USER_LOGGING_OUT
		});
        
		UserApi.logout()
        .then(function(user){
            Dispatcher.dispatch({
                actionType: _this.types.USER_LOGGED_OUT,
                user: user
            });
        })
        .catch(function(error){
            //TODO Not sure what to do here...
        });
	}	
};

module.exports = UserActions;
