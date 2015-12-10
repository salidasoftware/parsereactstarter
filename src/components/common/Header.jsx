"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var HeaderLink = require('./HeaderLink');
var UserMixin = require('../../mixins/UserMixin');

var Header = React.createClass({
	
	mixins: [UserMixin],
	
	render: function(){
		
		var authLink;
		if(this.state.authenticated) {
			authLink = (<HeaderLink to="/logout">Logout</HeaderLink>);
		}
		else {
			authLink = (<HeaderLink to="/login">Login</HeaderLink>);
		}
		
		return (
            
            <div className="top-bar">
                <div className="top-bar-left">
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li className="menu-text">ParseReactStarter</li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    <ul className="menu">
                        <HeaderLink to="/">Home</HeaderLink>
                        <HeaderLink to="/states">States</HeaderLink>
                        {authLink}
                    </ul>
                </div>
            </div>
		
		);
	}
});

module.exports = Header;