import React, {Component} from 'react';
import './App.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

class App extends Component {
  constructor(props) {
    super(props);
    //the map is handled by the state, so if you want to change the map's property
    //like zoom or pan, you can just call it by this.state.map.zoomIn(), shown
    // in line 22
    this.state = {currentZoomLevel: 7, map: null, tileLayer: null};
  }

  componentDidMount() {
    this.initMap();
  }

  //Event Handler for changing the zoom.
  async changeZoom() {
    var map = L.marker([51.505, -0.092]).addTo(this.state.map);
    map = this.state.map.zoomIn();
    await this.setState({map});
  }

  //Loading the Map, this only gets called once.
  initMap() {
    const position = [43.6532, -79.3832];
    const map = L.map(this._mapNode).setView(
      position,
      this.state.currentZoomLevel
    );
    const tileLayer = esri.basemapLayer('Topographic').addTo(map);

    esri.featureLayer({
      url: 'https://services.arcgis.com/zmLUiqh7X11gGV2d/arcgis/rest/services/CensusDivisions2016_proj/FeatureServer/0',
      simplifyFactor: 2,
      precision: 4, // digits of precision in meters.  we want 4 to identify individual streets. 
      where: `PRNAME = 'Ontario'`,
      style: function (feature) {
        const { Pop2016, Area } = feature.properties;
        // manual opacity filtering
        var density = Pop2016/Area;
        var opacity = Math.max(Math.min(1, Math.log(density)/5), 0.05);
        // in the province of Ontario
        return { weight: 1, opacity, fillOpacity: opacity, color: 'black', fillColor: 'green' };
      }
    })
    .addTo(map);

    this.setState({map, tileLayer});
    window.myMap = map;
    L.marker(position)
      .addTo(map)
      .bindPopup('A pretty CSS3 popup. <br> Easily customizable.');
  }

  render() {
    if (this.state.map) {
      window.console.log(
        'this.state.currentZoomLevel ->',
        this.state.map._zoom
      );
    }

    return (
      <div>
        <div
          ref={node => (this._mapNode = node)}
          id="map"
          style={{width: '100%', height: '400px'}}
        />
        <span> hello</span>
        <button onClick={() => this.changeZoom()}>Change Zoom</button>
      </div>
    );
  }
}

export default App;

