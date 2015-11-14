"use strict";

var config = require('./config');

Parse.initialize(config.parse_app_id, config.parse_app_key);

var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./routes');

ReactDOM.render(routes, document.getElementById('app'));
