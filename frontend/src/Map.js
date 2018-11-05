import esri from 'esri-leaflet';
import React from 'react';
require('leaflet');

class Map extends React.Component{

    componentDidMount(){

        let element = this.refs.mapRef

        // let map = L.map(element).setView([-41.2858, 174.78682], 14);
        var map = esri.map(this.refs.mapRef).setView([45.528, -122.680], 13)

        esri.basemapLayer("Streets").addTo(map);

        var parks = esri.featureLayer({
            url: 'https://services.arcgis.com/zmLUiqh7X11gGV2d/arcgis/rest/services/CensusDivisions2016_proj/FeatureServer/0',
            style: function() {
             return {
                 color: "#70ca49",
                 weight: 2
             };
            }
        }).addTo(map);
    }


    render(){
        return(
            <div>
                <h1>Maps page</h1>
                <div id='map' ref="mapRef" style={{height: "380px"}}></div>
            </div>
        )
    }

}

export default Map