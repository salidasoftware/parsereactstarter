"use strict";

var React = require('react');
var Header = require('./common/Header');

var App = React.createClass({
	render: function() {
		return (			
			<div>
				<Header />
				<div className="container-fluid">
					<div className="row">
						<div className="large-12 columns">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
		
	}
});

module.exports = App;