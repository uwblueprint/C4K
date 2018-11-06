import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <Map></Map>
      </div>
    );
  }
}

export default App;

