"use strict";

var React = require('react');
var TextInput = require('../common/TextInput');

var LoginForm = React.createClass({
	propTypes: {
        loggingIn: React.PropTypes.bool.isRequired,
		credentials: React.PropTypes.object.isRequired,
		onLogin: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},
	render: function() {
    
        var loginError = (<div></div>);
        var loginError = (<div></div>);
        if(this.props.errors.login) {
            loginError = (
                <div data-alert className="alert-box alert">
                    {this.props.errors.login}
                    <a href="#" className="close">&times;</a>
                </div>
            );
        }
    
		return (
			<form>
				<h1>Login</h1>
                
                {loginError}
				
				<TextInput
					type="email"
					name="email"
					label="Email"
                    disabled={this.props.loggingIn}
					value={this.props.credentials.email}
					onChange={this.props.onChange}
					error={this.props.errors.email} />
					
				<TextInput
					type="password"
					name="password"
					label="Password"
                    disabled={this.props.loggingIn}
					value={this.props.credentials.password}
					onChange={this.props.onChange}
					error={this.props.errors.password} />
					
				<input type="submit" 
					value="Login"
					className="button" 
                    disabled={this.props.loggingIn}
					onClick={this.props.onLogin} />
					
			</form>
		);
	}
});

module.exports = LoginForm;