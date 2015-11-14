"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var History = require('react-router').History;
var _ = require('lodash');

var HeaderLink = React.createClass({
	
	mixins: [History],
	
	propTypes: {
		to: React.PropTypes.string.isRequired
	},
	
	render: function(){
	
		//TODO - translate this to react-router 1.x
		var active = "";
		
		//https://github.com/rackt/react-router/blob/master/docs/API.md#history-mixin
		if(this.props.to == "/") {
			if(this.history.isActive(this.props.to, null, true)){
				active = 'active';
			}
		}
		else {
			if(this.history.isActive(this.props.to, null, false)){
				active = 'active';
			}
		}
		
		return (
			<li className={active}><Link to={this.props.to}>{this.props.children}</Link></li>		
		);
	}
});

module.exports = HeaderLink;