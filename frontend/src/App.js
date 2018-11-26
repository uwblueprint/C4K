import React, {Component} from 'react';
import './App.css';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { changeView } from './actions/changeViewActions';
import { 
  changeCensusDivision,
  changeDemographic,
} from './actions/changeDropdownActions';
import {
  changeOperatingBudget,
  changeClientServed,
  changeStaffCount,
} from './actions/changeSliderActions';

// constants 
import * as constants from './constants/viewConstants';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';
import ListView from './components/ListView';

class App extends Component {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

