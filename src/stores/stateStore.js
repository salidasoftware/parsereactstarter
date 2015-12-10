"use strict";

var Dispatcher = require('../dispatcher');
var StateActions = require('../actions/stateActions');
var StateApi = require('../api/stateApi');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var StateStore = assign({}, EventEmitter.prototype, {
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
	
	emitAction: function(action) {
		this.emit(action.actionType, action);
        //change is fired on every event, so clients can listen for it, or the more specific events as needed
        this.emitChange();
	},
	
	all: function() {
        return StateApi.all();
	},
    
    create: function() {
        return StateApi.create();
    }
	
});

Dispatcher.register(function(action){
	switch(action.actionType) {
        case StateActions.types.STATE_SAVING:
		case StateActions.types.STATE_SAVED:
        case StateActions.types.STATE_SAVE_ERROR:
            StateStore.emitAction(action);
			break;
        
        case StateActions.types.STATE_DELETING:
		case StateActions.types.STATE_DELETED:
		case StateActions.types.STATE_DELETE_ERROR:
			StateStore.emitAction(action);
			break;
            
        case StateActions.types.STATE_FETCHING:
		case StateActions.types.STATE_FETCHED:
		case StateActions.types.STATE_FETCH_ERROR:
			StateStore.emitAction(action);
			break;   
            
		default:
			
	}
});

//Subscribe to realtime updates
var client = new Faye.Client('http://a6ba7fc9.fanoutcdn.com/bayeux');
client.subscribe('/state/save', function (data) {
    StateApi.find(data.objectId)
    .then(function(state){
        Dispatcher.dispatch({
            actionType: StateActions.types.STATE_SAVED,
            state: state
        });
    });
});

client.subscribe('/state/delete', function (data) {
    Dispatcher.dispatch({
        actionType: StateActions.types.STATE_DELETED,
        state_id: data.id
    });
});

module.exports = StateStore;
