"use strict";

var React = require('react');
var Input = require('../common/textInput');

var StateActions = require('../../actions/stateActions');
var StateStore = require('../../stores/stateStore');

var StateForm = React.createClass({
	propTypes: {
        state: React.PropTypes.object,
	},
    
    componentWillMount: function() {
        StateStore.addActionListener(StateActions.types.STATE_SAVING, this._onStateSaving);
        StateStore.addActionListener(StateActions.types.STATE_SAVED, this._onStateSaved);
        StateStore.addActionListener(StateActions.types.STATE_SAVE_ERROR, this._onStateSaveError);
        
        StateStore.addActionListener(StateActions.types.STATE_DELETING, this._onStateDeleting);
        StateStore.addActionListener(StateActions.types.STATE_DELETED, this._onStateDeleted);
        StateStore.addActionListener(StateActions.types.STATE_DELETE_ERROR, this._onStateDeleteError);
        
        StateStore.addActionListener(StateActions.types.STATE_FETCHING, this._onStateFetching);
        StateStore.addActionListener(StateActions.types.STATE_FETCHED, this._onStateFetched);
        StateStore.addActionListener(StateActions.types.STATE_FETCH_ERROR, this._onStateFetchError);  
	},
    
    componentWillUnmount: function() {
		StateStore.removeActionListener(StateActions.types.STATE_SAVING, this._onStateSaving);
        StateStore.removeActionListener(StateActions.types.STATE_SAVED, this._onStateSaved);
        StateStore.removeActionListener(StateActions.types.STATE_SAVE_ERROR, this._onStateSaveError);
        
        StateStore.removeActionListener(StateActions.types.STATE_DELETING, this._onStateDeleting);
        StateStore.removeActionListener(StateActions.types.STATE_DELETED, this._onStateDeleted);
        StateStore.removeActionListener(StateActions.types.STATE_DELETE_ERROR, this._onStateDeleteError);
        
        StateStore.removeActionListener(StateActions.types.STATE_FETCHING, this._onStateFetching);
        StateStore.removeActionListener(StateActions.types.STATE_FETCHED, this._onStateFetched);
        StateStore.removeActionListener(StateActions.types.STATE_FETCH_ERROR, this._onStateFetchError); 
	},
    
    _onStateSaving: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: true});
        }
    },
    
    _onStateSaved: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false, error: null, state: event.saved_state, editing: false});
            if(this.state.eject) {
                this.setState({state: StateStore.create(), editing: true});
            }
        }
    },
    
    _onStateSaveError: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false, error: event.error});
        }
    },
    
    _onStateDeleting: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: true});
        }
    },
    
    _onStateDeleted: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false});
        }
    },
    
    _onStateDeleteError: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false, error: event.error});
        }
    },
    
    _onStateFetching: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: true});
        }
    },
    
    _onStateFetched: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false, state: event.state});
        }
    },
    
    _onStateFetchError: function(event) {
        if(event.state == this.state.state) {
            this.setState({working: false, error: event.error});
        }
    },
    
    getInitialState: function() {
        var state;
        var eject = false;
        var editing = false;
        if(this.props.state) {
            state = this.props.state;
        }
        else {
            state = StateStore.create();
            eject = true;  //After save, we'll eject the state and start a new one\
            editing = true;
        }
		return {
            form_errors: {},
            error: null,
            eject: eject,
            state: state,
            working: false,
            editing: editing,
		};
	},
    
    updateState: function(event) {
		var field = event.target.name;
		var value = event.target.value;
		this.state.state.set(field, value);
        return this.setState({state: this.state.state});
	},
    
    stateFormIsValid: function() {
		var formIsValid = true;
		this.state.form_errors = {};
		if ((!this.state.state.get('name')) || (this.state.state.get('name').length == 0)) {
			this.state.form_errors.name = 'Name is required';
			formIsValid = false;
		}
		this.setState({form_errors: this.state.form_errors});
		return formIsValid;		
	},

    saveState: function(event) {
        event.preventDefault();
        if(!this.stateFormIsValid()){
			return;
		}
        StateActions.save(this.state.state);
    },
    
    deleteState: function(event) {
        event.preventDefault();
        if(confirm("Really delete "+this.state.state.get("name")+"?")) {
            StateActions.delete(this.state.state);
        }
    },
    
    enableEditing: function(event) {
        event.preventDefault();
        this.setState({editing: true});
    },
    
    disableEditing: function(event) {
        event.preventDefault();
        this.setState({editing: false});
        if(this.state.state.dirty()) {
            StateActions.fetch(this.state.state);
        }
    },
    
	render: function() {
        
        var state ;
        var callout_classes = "callout";
        if(this.state.working) {
            callout_classes = "secondary callout";
        }
        
        var delete_button = (<span></span>);
        if(!this.state.state.isNew()) {
            delete_button = (<a onClick={this.deleteState} style={{color: 'red'}}><i className="fa fa-times"></i> Delete</a>)
        }
        
        if(this.state.editing) {
        
            var error = (<div></div>);
            if(this.state.error) {
                error = (<div className="alert callout small">{error}</div>);
            }
            
            var cancel_button = (<span></span>);
            var save_text = (<span><i className="fa fa-plus-square"></i> Add</span>);
            if(!this.state.state.isNew()) {
                var save_text = (<span><i className="fa fa-check-square"></i> Save</span>);
                cancel_button = (<a onClick={this.disableEditing} className="secondary button">Cancel</a>)
            }
        
            return (
                <div className={callout_classes}>
                    <form disabled={this.state.working}>
                    
                        {error}
                        
                        <Input
                            name="name"
                            label="Name"
                            type="text"
                            value={this.state.state.get('name')}
                            onChange={this.updateState}
                            error={this.state.form_errors.name} />
                        
                        <button type="submit" 
                            value={save_text}
                            disabled={this.state.working}
                            className="button" 
                            onClick={this.saveState}>{save_text}</button>
                            
                        {cancel_button}
                            
                    </form>
                </div>
            );
            
        }
        else {
            //not editing
            
            return (
                
                <div className={callout_classes}>
                    <div>
                        {this.state.state.get("name")}
                    </div>
                    <div className="row">
                        <div className="small-6 columns text-left">
                            <a onClick={this.enableEditing}><i className="fa fa-pencil"></i> Edit</a>
                        </div>
                        <div className="small-6 columns text-right">
                            {delete_button}
                        </div>
                    </div>
                </div>
                
            );
            
        }
	}
});

module.exports = StateForm;