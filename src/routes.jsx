"use strict";

var React = require("react");
var Router = require('react-router').Router
var Route = require('react-router').Route
var IndexRoute = require('react-router').IndexRoute;
var Redirect = require('react-router').Redirect;

var App = require('./components/App');
var AboutPage = require('./components/AboutPage');
var HomePage = require('./components/HomePage');

var NotFoundPage = require('./components/NotFoundPage');
var LoginPage = require('./components/users/LoginPage');
var LogoutPage = require('./components/users/LogoutPage');
var RegisterPage = require('./components/users/RegisterPage');
var StatesPage = require('./components/states/StatesPage');

var routes = (

	<Router>
    	<Route path="/" component={App}>
			<IndexRoute component={HomePage}/>
			<Route path="about" component={AboutPage} />
			<Route path="login" component={LoginPage} />
			<Route path="logout" component={LogoutPage} />
			<Route path="register" component={RegisterPage} />
            <Route path="states" component={StatesPage} />
			<Route path="*" component={NotFoundPage}/>
		</Route>
	</Router>
	
);

module.exports = routes;
