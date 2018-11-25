import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import ToggleView from './components/ToggleView';

// import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Map />
        <ToggleView />
      </div>
    );
  }
}

export default App;

