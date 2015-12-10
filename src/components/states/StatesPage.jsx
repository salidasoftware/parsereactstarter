"use strict";

var React = require('react');
var Router = require('react-router').Router;
var Link = require('react-router').Link;
var State = require('./State');

var History = require('react-router').History;
var AuthenticatedMixin = require('../../mixins/AuthenticatedMixin');

var StateActions = require('../../actions/stateActions');
var StateStore = require('../../stores/stateStore');

var toastr = require('toastr');

var _ = require('underscore');

var StatesPage = React.createClass({
	
	mixins: [History, AuthenticatedMixin],

	componentWillMount: function() {
		StateStore.addChangeListener( this._onStatesChanged);
	},
    
    componentWillUnmount: function() {
		StateStore.removeChangeListener(this._onStatesChanged);
	},
    
    componentDidMount: function() {
        this.updateStates();
    },
    
    _onStatesChanged: function() {
        this.updateStates();
    },
    
	getInitialState: function() {
		return {
            states: []
		};
	},
	
	updateStates: function() {
        var _this = this;
		StateStore.all()
        .then(function(states){
            _this.setState({states: states}); 
        })
        .catch(function(error){
            toastr.error(error.message);    
        });
	},
		
	render: function() {
        
        var states = [];
        _.each(this.state.states, function(state){
            states.push(
                <State key={state.id} state={state}></State>
            )
        });
        
		return (
			<div>
				<h1>States</h1>
                {states}
                <State></State>
			</div>
		);
	}
});

module.exports = StatesPage;