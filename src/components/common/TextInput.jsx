"use strict";

var React = require('react');

var TextInput = React.createClass({

	propTypes: {
		type: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		onChange: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.string,
		error: React.PropTypes.string
	},

	render: function() {
	
        var errorMessage = (<span></span>);
        var labelClass = "";
		if(this.props.error && this.props.error.length > 0) {
            labelClass = "error";
            errorMessage = (<div className="alert callout">{this.props.error}</div>);
		}    
	
		return (
			<div>
				<label htmlFor={this.props.name} className={labelClass}>{this.props.label}
                    <input type={this.props.type}
                        name={this.props.name}
                        className="form-control"
                        placeholder={this.props.placeholder}
                        ref={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange} />
                </label>
				{errorMessage}
			</div>	
		);
	}
});

module.exports = TextInput;