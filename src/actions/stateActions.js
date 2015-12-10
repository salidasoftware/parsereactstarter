"use strict";

var Dispatcher = require('../dispatcher');
var StateApi = require('../api/stateApi');
var keyMirror = require('keyMirror');

var StateActions = {
    
    types: keyMirror({
        STATE_SAVING: null,
        STATE_SAVED: null,
        STATE_SAVE_ERROR: null,
        STATE_DELETING: null,
        STATE_DELETED: null,
        STATE_DELETE_ERROR: null,
        STATE_FETCHING: null,
        STATE_FETCHED: null,
        STATE_FETCH_ERROR: null,
    }),
    
	save: function(state) {
        
        var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.STATE_SAVING,
            state: state
		});
        
        StateApi.save(state)
        .then(function(saved_state){
            Dispatcher.dispatch({
                actionType: _this.types.STATE_SAVED,
                state: state,
                saved_state: saved_state
            });
        }).catch(function(error){            
            Dispatcher.dispatch({
                actionType: _this.types.STATE_SAVE_ERROR,
                state: state,
                error: error.message
            });
        });
	},
	delete: function(state) {
		var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.STATE_DELETING,
            state: state
		});
        
		StateApi.delete(state)
        .then(function(deleted_state){
            Dispatcher.dispatch({
                actionType: _this.types.STATE_DELETED,
                state: state
            });
        }).catch(function(error){
            Dispatcher.dispatch({
                actionType: _this.types.STATE_DELETE_ERROR,
                state: state,
                error: error.message
            });
        });
	},
    fetch: function(state) {
        var _this = this;
        Dispatcher.dispatch({
			actionType: _this.types.STATE_FETCHING,
            state: state
		});
        
		StateApi.fetch(state)
        .then(function(state){
            Dispatcher.dispatch({
                actionType: _this.types.STATE_FETCHED,
                state: state
            });
        }).catch(function(error){
            Dispatcher.dispatch({
                actionType: _this.types.STATE_FETCH_ERROR,
                state: state,
                error: error.message
            });
        });
	},
};

module.exports = StateActions;
