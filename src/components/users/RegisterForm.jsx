"use strict";

var React = require('react');
var TextInput = require('../common/TextInput');

var RegisterForm = React.createClass({
	propTypes: {
        registering: React.PropTypes.bool.isRequired,
		credentials: React.PropTypes.object.isRequired,
		onRegister: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},
	render: function() {
    
        var signupError = (<div></div>);
        if(this.props.errors.signup) {
            signupError = (
                <div data-alert className="alert-box alert">
                    {this.props.errors.signup}
                    <a href="#" className="close">&times;</a>
                </div>
            );
        }
        
        return (
			<form>
				<h1>Register</h1>
                
                {signupError}
				
				<TextInput
					type="email"
					name="email"
					label="Email"
                    disabled={this.props.registering}
					value={this.props.credentials.email}
					onChange={this.props.onChange}
					error={this.props.errors.email} />
					
				<TextInput
					type="password"
					name="password"
					label="Password"
                    disabled={this.props.registering}
					value={this.props.credentials.password}
					onChange={this.props.onChange}
					error={this.props.errors.password} />
					
				<TextInput
					type="password"
					name="password_confirmation"
					label="Confirm Password"
                    disabled={this.props.registering}
					value={this.props.credentials.password_confirmation}
					onChange={this.props.onChange}
					error={this.props.errors.password_confirmation} />
					
				<input type="submit" 
					value="Register"
					className="button" 
                    disabled={this.props.registering}
					onClick={this.props.onRegister} />
					
			</form>
		);
	}
});

module.exports = RegisterForm;