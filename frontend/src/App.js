import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

import * as constants from './constants/viewConstants';
import {
  changeView,
  changeDemographic,
  changeOperatingBudget,
  changeClientServed,
  changeStaffCount,
  getServiceProviders,
  getCensusDivisionData,
  selectCensusDivision,
  signIn,
} from './actions';

import './App.css';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';
import ListView from './components/ListView';
import ServiceProviderDialog from './components/ServiceProviderDialog';
import CensusDivisionInfo from './components/CensusDivisionInfo';

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

    // TODO: put it under authentication
    this.props.getCensusDivisionData()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        firebase.auth().currentUser.getIdToken(true)
          .then(idToken => {
            user.token = idToken;
            user.db = firebase;
            // Save user to state
            this.props.signIn(user);
            this.props.getServiceProviders(idToken);
          }).catch(err => {
            console.log(err);
          });
      } else {
        // No user is signed in
        this.props.getServiceProviders();
      }
    });

  }

  renderMainView() {
    if (this.props.view === constants.MAP_VIEW) {
      return (
        <div>
          <Map
            selected={this.props.selected}
            selectCensusDivision={this.props.selectCensusDivision}
            serviceProviders={this.props.serviceProviders} />
          <CensusDivisionInfo
            selected={this.props.selected}
            censusDivisionData={this.props.censusDivisionData} />
        </div>
      )
    } else {
      return <ListView />
    }
  }

  render() {
    return (
      <div>
        <Sidebar
          selected={this.props.selected}
          selectCensusDivision={this.props.selectCensusDivision}
          censusDivisionData={this.props.censusDivisionData}
          demographic={this.props.demographic}
          changeDemographic={this.props.changeDemographic}
          operatingBudget={this.props.operatingBudget}
          clientServed={this.props.clientServed}
          staffCount={this.props.staffCount}
          changeOperatingBudget={this.props.changeOperatingBudget}
          changeClientServed={this.props.changeClientServed}
          changeStaffCount={this.props.changeStaffCount}
        />
        { this.renderMainView() }
        <ToggleView view={this.props.view} changeView={this.props.changeView}/>
        <div style={{ zIndex: '100000000', position: 'absolute' }}><ServiceProviderDialog/></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view:               state.changeViewReducer.view,
    demographic:        state.changeDropdownReducer.demographic,
    operatingBudget:    state.changeSliderReducer.operatingBudget,
    clientServed:       state.changeSliderReducer.clientServed,
    staffCount:         state.changeSliderReducer.staffCount,
    user:               state.authReducer,
    selected:           state.censusDivisionReducer.selected,
    censusDivisionData: state.censusDivisionReducer.data,
    serviceProviders:   state.serviceProviderReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeView,
    changeDemographic,
    changeOperatingBudget,
    changeClientServed,
    changeStaffCount,
    getServiceProviders,
    getCensusDivisionData,
    selectCensusDivision,
    signIn,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
