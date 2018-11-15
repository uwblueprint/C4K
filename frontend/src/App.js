import React, {Component} from 'react';
import './App.css';

// Redux
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeView} from './actions/changeViewActions';

// constants 
import * as constants from './constants/viewConstants';

// components
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';
import ListView from './components/ListView';

// import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        {this.props.view === constants.MAP_VIEW ? <Map /> : <ListView /> }
        <ToggleView view={this.props.view} changeView={this.props.changeView}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.changeViewReducer.view
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeView: bindActionCreators(changeView, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

