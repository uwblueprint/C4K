import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

import * as constants from './constants/viewConstants';
import {
    changeView,
    changeCensusDivision,
    changeDemographic,
    changeOperatingBudget,
    changeClientServed,
    changeStaffCount,
    signIn
} from './actions';

import './App.css';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';
import ListView from './components/ListView';

// Move to environment variables in production
const config = {
    apiKey: "AIzaSyCleo1v8xaS9vSirU8mn7nzR7AkhN0dyiM",
    authDomain: "c4k-dashboard.firebaseapp.com",
    databaseURL: "https://c4k-dashboard.firebaseio.com",
    projectId: "c4k-dashboard",
    storageBucket: "c4k-dashboard.appspot.com",
    messagingSenderId: "551785168434"
};

firebase.initializeApp(config)

class App extends Component {
    constructor(props) {
        super(props);
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                firebase.auth().currentUser.getIdToken(true)
                .then(idToken => {
                    user.token = idToken;
                    user.db = firebase;
                    // Save user to state
                    this.props.signIn(user);
                }).catch(err => {
                    console.log(err);
                });
            } else {
                // User is signed out.
                console.log('No user');
            }
        });
    }
    render() {
        return (
            <div>
                <Sidebar 
                censusDivision={this.props.censusDivision}
                demographic={this.props.demographic}
                changeCensusDivision={this.props.changeCensusDivision}
                changeDemographic={this.props.changeDemographic}
                operatingBudget={this.props.operatingBudget}
                clientServed={this.props.clientServed}
                staffCount={this.props.staffCount}
                changeOperatingBudget={this.props.changeOperatingBudget}
                changeClientServed={this.props.changeClientServed}
                changeStaffCount={this.props.changeStaffCount}
                />
                {this.props.view === constants.MAP_VIEW ? <Map /> : <ListView /> }
                <ToggleView view={this.props.view} changeView={this.props.changeView} />
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    view: state.changeViewReducer.view,
    censusDivision: state.changeDropdownReducer.censusDivision,
    demographic: state.changeDropdownReducer.demographic,
    operatingBudget: state.changeSliderReducer.operatingBudget,
    clientServed: state.changeSliderReducer.clientServed,
    staffCount: state.changeSliderReducer.staffCount,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView: bindActionCreators(changeView, dispatch),
    changeCensusDivision: bindActionCreators(changeCensusDivision, dispatch),
    changeDemographic: bindActionCreators(changeDemographic, dispatch),
    changeOperatingBudget: bindActionCreators(changeOperatingBudget, dispatch),
    changeClientServed: bindActionCreators(changeClientServed, dispatch),
    changeStaffCount: bindActionCreators(changeStaffCount, dispatch),
    signIn: user => dispatch(signIn(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
