"use strict";

var Dispatcher = require('../dispatcher');
var UserActions = require('../actions/userActions');
var UserApi = require('../api/userApi');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _register_error = null;
var _login_error = null;

var UserStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
		this.on('change', callback);	
	},
	
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);	
	},
	
	emitChange: function() {
		this.emit('change');
	},
    
	addActionListener: function(action_type, callback) {
		this.on(action_type, callback);	
	},
	
	removeActionListener: function(action_type, callback) {
		this.removeListener(action_type, callback);	
	},
	
	emitAction: function(action_type) {
		this.emit(action_type);
        //change is fired on every event, so clients can listen for it, or the more specific events as needed
        this.emitChange();
	},
	
	getCurrentUser: function() {
		return UserApi.current();
	},
    
    getRegisterError: function() {
        return _register_error;
    },
    
    getLoginError: function() {
        return _login_error;
    },
	
});

Dispatcher.register(function(action){
	switch(action.actionType) {
        case UserActions.types.USER_REGISTERING:
            _register_error = null;
			UserStore.emitAction(action.actionType);
			break;
		case UserActions.types.USER_REGISTERED:
            _register_error = null;
			UserStore.emitAction(action.actionType);
			break;
        case UserActions.types.USER_REGISTER_ERROR:
            _register_error = action.error;
			UserStore.emitAction(action.actionType);
			break;
        
        case UserActions.types.USER_LOGGING_IN:
            _login_error = null;
			UserStore.emitAction(action.actionType);
			break;
		case UserActions.types.USER_LOGGED_IN:
			_login_error = null;
			UserStore.emitAction(action.actionType);
			break;
		case UserActions.types.USER_LOGIN_ERROR:
			_login_error = action.error;
			UserStore.emitAction(action.actionType);
			break;
            
        case UserActions.types.USER_LOGGING_OUT:
			UserStore.emitAction(action.actionType);
			break;
		case UserActions.types.USER_LOGGED_OUT:
			UserStore.emitAction(action.actionType);
			break;   
            
		default:
			
	}
});

module.exports = UserStore;
