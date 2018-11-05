import React, {Component} from 'react';
import './App.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';

class App extends Component {
  constructor(props) {
    super(props);

    //the map is handled by the state: e.g. this.state.map.zoomIn() to zoom
    this.state = {currentZoomLevel: 7, map: null, tileLayer: null};
  }

  componentDidMount() {
    this.initMap();
  }

  onMouseHandler(event) {
    document.getElementById('map').title = event.layer.feature.properties.CDNAME;
  }

  onClickHandler = (event) => {
    const { properties } = event.layer.feature;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', () => document.body.removeChild(overlay));

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.addEventListener('click', (e) => { e.stopPropagation(); });

    const title = document.createElement('h2');
    title.innerHTML = 'DEMOGRAPHIC';

    const region = document.createElement('p');
    region.innerHTML = `${properties.CDNAME}, ${properties.PRNAME}`;

    const population = document.createElement('p');
    population.innerHTML = `${properties.Pop2016}`;


    modal.appendChild(title);
    modal.appendChild(region);
    modal.appendChild(population);

    overlay.appendChild(modal);

    document.body.appendChild(overlay);
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
      simplifyFactor: 0.5,
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
    .on('mouseover', this.onMouseHandler)
    .on('click', this.onClickHandler)
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
          style={{width: '100%', height: '100%'}}
        />
      </div>
    );
  }
}

export default App;

