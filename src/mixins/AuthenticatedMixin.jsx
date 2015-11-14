"use strict";

var Router = require('react-router').Router;
var History = require('react-router').History;
var UserStore = require('../stores/userStore');

var AuthenticatedMixin = {
    mixins: [History],
    componentWillMount: function(transition){
        var user = UserStore.getCurrentUser();
        if(user == null) {
            this.history.pushState(null, '/');
        }
    }
};

module.exports = AuthenticatedMixin;