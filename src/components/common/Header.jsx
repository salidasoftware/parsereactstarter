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
		
			<nav className="top-bar" data-topbar role="navigation">
				<ul className="title-area">
					<li className="name">
						<h1><Link to="/">ParseReactStarter</Link></h1>
					</li>
					<li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
				</ul>
				
				<section className="top-bar-section">
					<ul className="right">
						<HeaderLink to="/">Home</HeaderLink>
						{authLink}
					</ul>
					
					<ul className="left">
						
					</ul>
				</section>
			</nav>
		
		);
	}
});

module.exports = Header;