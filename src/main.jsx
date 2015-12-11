"use strict";

var config = require('./config');

Parse.initialize(config.parse_app_id, config.parse_app_key);

let injectTapEventPlugin = require("react-tap-event-plugin");
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()

var ReactDOM = require('react-dom');
var routes = require('./routes');

ReactDOM.render(routes, document.getElementById('app'));
