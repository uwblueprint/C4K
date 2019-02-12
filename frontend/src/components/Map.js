import React, {Component} from 'react';
import './Map.css';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import ReactDOM from 'react-dom';
import Popup from './Popup';

class Map extends Component {

  constructor(props) {
    super(props);

    //the map is handled by the state: e.g. this.state.map.zoomIn() to zoom
    this.state = {
      currentZoomLevel: 7, 
      map: null, 
      baseMapLayer: null,
      featureLayer: null,
      stopPropagationEvent: true
    };
  }

  componentDidMount() {
    this.initMap();
  }

  populateServiceProviders() {
    this.props.serviceProviders
      .filter(provider => provider.ismain)
      .forEach(provider => {
        const popup = document.createElement('div');
        ReactDOM.render(
          <Popup
            name={provider.name}
            type={provider.type}
            location={provider.location}
            address={provider.address}
            phone={provider.phone}
            site={provider.website}
          />,
          popup
        );

        L.marker([provider.longitude, provider.latitude])
          .addTo(this.state.map)
          .bindPopup(popup)
      });
  }

  highlightCensusDivision() {
    this.state.featureLayer.eachFeature((layer) => {
      let CDUID = parseInt(layer.feature.properties.CDUID)
      if (this.props.selected === CDUID) {
        layer.setStyle({ fillColor: '#FFFF00' })
      } else {
        layer.setStyle({ fillColor: '#2526A9' })
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.serviceProviders !== this.props.serviceProviders) {
      this.populateServiceProviders();
    }

    if (prevProps.selected !== this.props.selected) {
      this.highlightCensusDivision()
    }
  }

  onMouseHandler(event) {
    document.getElementById('map').title = event.layer.feature.properties.CDNAME;
  }

  //Loading the Map, this only gets called once.
  initMap() {
    const position = [43.6532, -79.3832];
    const map = L.map(this._mapNode).setView(
      position,
      this.state.currentZoomLevel
    );
    map.on('click', (e) => {
      // clear the selection
      if (!this.state.stopPropagationEvent) {
        this.props.selectCensusDivision(null)
      }
      this.setState({ stopPropagationEvent: false })
    })
    const baseMapLayer = esri.basemapLayer('Topographic').addTo(map);
    const featureLayer = esri.featureLayer({
      url: 'https://services.arcgis.com/zmLUiqh7X11gGV2d/arcgis/rest/services/CensusDivisions2016_proj/FeatureServer/0',
      simplifyFactor: 0.5,
      precision: 4, // digits of precision in meters.  we want 4 to identify individual streets. 
      where: `PRNAME = 'Ontario'`,
      style: (feature) => {
        const { Pop2016, Area } = feature.properties;
        // manual opacity filtering
        var density = Pop2016/Area;
        var opacity = Math.max(Math.min(1, Math.log(density)/5), 0.05); // not used for now
        // in the province of Ontario
        return { weight: 1, opacity, fillOpacity: 0.3, color: 'black', fillColor: '#2526A9' };
      },
      onEachFeature: (feature, layer) => {
        layer.on('click', () => {
          this.setState({ stopPropagationEvent: true })
          const CDUID = parseInt(feature.properties.CDUID)
          this.props.selectCensusDivision(CDUID)
        });
      },
    })
    .on('mouseover', this.onMouseHandler)
    .on('load', () => this.highlightCensusDivision())
    .addTo(map);

    this.setState({
      map,
      baseMapLayer,
      featureLayer
    }, () => {
      this.populateServiceProviders()
    });

    window.myMap = map;
  }

  render() {
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

export default Map
