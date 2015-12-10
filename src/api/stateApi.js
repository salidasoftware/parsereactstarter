"use strict";

var Promise = require("bluebird");

var StateApi = {
    
    all: function(){
        return new Promise(function(resolve, reject){
            var query = new Parse.Query("State");
            query.find({
                success: function(states) {
                    resolve(states);
                },
                error: function(error) {
                    console.log("StateApi.all error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },
    find: function(id){
        var query = new Parse.Query("State");
        return new Promise(function(resolve, reject){
            query.get(id, {
                success: function(state) {
                    resolve(state);
                },
                error: function(object, error) {
                    console.log("StateApi.find error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },
    create: function() {
        var State = Parse.Object.extend("State");
        return new State();  
    },
    fetch: function(state) {
        return new Promise(function(resolve, reject){
            state.fetch({
                success: function(state) {
                    resolve(state);
                },
                error: function(state, error) {
                    console.log("StateApi.fetch error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },
    save: function(state){
        return new Promise(function(resolve, reject){
            state.save(null, {
                success: function(state) {
                    resolve(state);
                },
                error: function(state, error) {
                    console.log("StateApi.save error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },
    delete: function(state){
        return new Promise(function(resolve, reject){
            state.destroy({
                success: function(state) {
                    resolve(state);
                },
                error: function(state, error) {
                    console.log("StateApi.delete error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },

}

module.exports = StateApi;