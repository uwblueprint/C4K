import React, {Component} from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;

