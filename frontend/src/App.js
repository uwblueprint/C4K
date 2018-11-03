import React, { Component } from 'react';
import logo from './logo.svg';
import MapView from './MapView.js'
import './App.css';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MapView />
      </div>
      <div>
        <h1>C4K React Application!</h1>
        <div>Components</div>
      </div>
    );
  }
}

export default App;
