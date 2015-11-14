"use strict";

var Promise = require("bluebird");

var UserApi = {
    
    register: function(credentials){
        return new Promise(function(resolve, reject){
            
            var user = new Parse.User();
            user.set("username", credentials.email);
            user.set("password", credentials.password);
            user.set("email", credentials.email);
            user.signUp(null, {
                success: function(user) {
                    resolve(user);
                },
                error: function(user, error) {
                    console.log("UserApi.register error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
            
        });
    },
    
    login: function(credentials){
        return new Promise(function(resolve, reject){
            Parse.User.logIn(credentials.email, credentials.password, {
                success: function(user) {
                    resolve(user);
                },
                error: function(user, error) {
                    console.log("Error: " + error.code + " " + error.message);
                    reject(new Error(error.message));
                }
            });
        });
    },
    
    logout: function(){
        return new Promise(function(resolve, reject){
            Parse.User.logOut().then(function(){
                resolve();
            });
        });
    },
    
    current: function(){
        return Parse.User.current();
    }
}

module.exports = UserApi;