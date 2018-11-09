import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <ToggleView />
        <Map />
      </div>
    );
  }
}

export default App;

