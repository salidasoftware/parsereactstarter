"use strict";

var React = require('react');
var Header = require('./common/Header');
var History = require('react-router').History;

const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');
const AppBar = require('material-ui/lib/app-bar');
const SwipeableViews = require('react-swipeable-views');
var UserMixin = require('../mixins/UserMixin');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const IconButton = require('material-ui/lib/icon-button');
const MenuDivider = require('material-ui/lib/menus/menu-divider');

var App = React.createClass({
    
    mixins: [UserMixin, History],
    
    getInitialState: function() {
        return {
            //slideIndex: 0,
            path: this.props.location.pathname
        };
    },
    
    /*
    _handleChangeTabs: function(value, event, tab) {
        this.setState({slideIndex: parseInt(value)});
    },
    
    _handleChangeIndex: function(index) {
        this.setState({slideIndex: index});
    },
    
        <Tabs onChange={this._handleChangeTabs} value={this.state.slideIndex + ''}>
        <Tab label="States" value="0" />
        <Tab label="Tab Two" value="1" />
        <Tab label="Tab Three" value="2" />
    </Tabs>
    <SwipeableViews index={this.state.slideIndex} onChangeIndex={this._handleChangeIndex}>
        <div>
            <h2>Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
        </div>
        <div>
            <h2>TWO Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
        </div>
        <div>
            <h2>THREE Tabs with slide effect</h2>
            Swipe to see the next slide.<br />
        </div>
    </SwipeableViews>
    */
    
    _menuItemNav: function(event, value) {
        event.preventDefault();
        this.history.pushState(null, value);
    },
    
    componentWillReceiveProps(nextProps) {
        this.setState({path: nextProps.location.pathname});
    },
    
	render: function() {
        
        var authLinks = [];
        authLinks.push(<MenuItem primaryText="Home" value="/" />);
        
        if(this.state.authenticated) {
            authLinks.push(<MenuItem primaryText="States" value="/states"  />);
            authLinks.push(<MenuDivider />);
            authLinks.push(<MenuItem primaryText="Logout" value="/logout" />);
        }
		else {
            authLinks.push(<MenuDivider />);
			authLinks.push(<MenuItem primaryText="Login" value="/login" />);
		}
        
        //fa icon example
        //<IconButton iconClassName="fa fa-chevron-down" tooltip="Menu"/>
        
		return (			
			<div>
				<AppBar
                    title="Parse React Starter"
                    iconElementLeft={<span></span>}
                    //iconClassNameRight="fa fa-chevron-down"
                    iconElementRight={
                        <IconMenu value={this.state.path} onChange={this._menuItemNav} iconButtonElement={
                            <IconButton iconClassName="material-icons" tooltip="Menu">menu</IconButton>
                            }>
                            {authLinks}
                        </IconMenu>
                    }
                    />
                    
                <div className="row">
                    <div className="large-12 columns">
                        {this.props.children}
                    </div>
                </div>
                
			</div>
		);
		
	}
});

module.exports = App;