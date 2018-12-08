import React, {Component} from 'react';
import './Map.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';


// This is the default style of layers when the user isn't interacting
// with the map
let quiet = {
  fillColor: '#3399FF',
  fillOpacity: 0.2,
  color: 'white',
  opacity: 0.6,
  weight: 1,
  dashArray: 0
};

// The style of a layer that's been filtered to but not the specific
// shape the user selected
let medium = {
  fillColor: '#D6EBFF',
  fillOpacity: 0.4,
  opacity: 1,
  weight: 1
};

// The specific shape selected
let loud = {
  fillColor: '#FFFF00',
  fillOpacity: 0.8,
  opacity: 0.2,
  weight: 3,
  dashArray: '3'
};

class Map extends Component {

  constructor(props) {
    super(props);

    //the map is handled by the state: e.g. this.state.map.zoomIn() to zoom
    this.state = {currentZoomLevel: 7, map: null, tileLayer: null};
    //this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentDidMount() {
    this.initMap();
  }

  onMouseHandler(event) {
    document.getElementById('map').title = event.layer.feature.properties.CDNAME;
  }

  onEachFeature(feature, layer) {
    console.log(layer);
    console.log(this.state.map._layers);
    // console.log(feature);
    // console.log(this.props);
    layer.on('click', (e) => { 
      layer.setStyle({fillColor: '#FFFF00'});

      // Check if layer is already selected
      let cdID = parseInt(feature.properties.CDUID, 10);
      if (cdID !== this.props.selectedCensusDivision) {
        // fire an action to change the new census division
        this.props.selectCensusDivision(cdID);
        // this.state.map.onEachLayers
      }
      // else do nothing - they already have the census division selected

      // update the style of all the census divisions


    });
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
        var opacity = Math.max(Math.min(1, Math.log(density)/5), 0.05); // not used for now
        // in the province of Ontario
        return { weight: 1, opacity, fillOpacity: 0.3, color: 'black', fillColor: '#2526A9' };
      },
      onEachFeature: this.onEachFeature.bind(this),
    })
    .on('mouseover', this.onMouseHandler)
    .addTo(map);

    this.setState({map, tileLayer});
    window.myMap = map;
    L.marker(position)
      .addTo(map);
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
          style={{width: '100%', height: '100%', marginLeft: '441px'}}
        />
      </div>
    );
  }
}

export default Map;

