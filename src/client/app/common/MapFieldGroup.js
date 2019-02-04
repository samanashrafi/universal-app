import React, {Component} from "react";
// import {Map, TileLayer, Marker, Popup} from "react-leaflet";
if (process.env.BROWSER) {
    debugger

    // var L = require("leaflet");
    var Map = require('react-leaflet').Map;
    var TileLayer = require('react-leaflet').TileLayer;
    var Marker = require('react-leaflet').Marker;
    var Popup = require('react-leaflet').Popup;
  }
class MapFieldGroup extends Component {
    // handleClick(e) {
    //     // debugger
    //     let {viewport} = this.refs.refMap;
    //     let {zoom} = this.refs.refMap.viewport;
    //     if (zoom == undefined) {
    //         zoom = 13;
    //     }
    //     //this.refs.refMap.viewport;
    //     if (e.latlng != null) {
    //         this.setState({
    //             hasLocation: true,
    //             lat: e.latlng["lat"],
    //             lng: e.latlng["lng"],
    //             zoom: zoom,
    //             viewPort: viewport
    //         });
    //         console.log(e.latlng["lat"], e.latlng["lng"], zoom)
    //         this.props.selectLatLng(this.state.lat, this.state.lng)
    //     }
    // };
    // onZoomLevelsChange(e){
    //     // debugger
    //     let {viewport} = this.refs.refMap;
    //     this.setState({
    //         viewPort: viewport
    //     });
    //     console.log(viewport)
    // }

    constructor(props) {
        super(props);
        this.state = {
            hasLocation: false,
            lat: 35.699533,
            lng: 51.378896,
            viewPort: {},
            zoom: 13
        };
    }

    componentWillMount(){
        // console.log('componentWillMount')
        // Map = require('react-leaflet').Map
        // TileLayer = require('react-leaflet').TileLayer
        // Marker = require('react-leaflet').Marker
        // Popup = require('react-leaflet').Popup
    }

    render() {
        // if (window !== 'undefined')
        //     return '';

        const {icon, label, error} = this.props;
        const {lat, lng, zoom, hasLocation, viewPort} = this.state;

        const position = [lat, lng];
        const marker = hasLocation ? (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        ) : '';

        return (
            <div className="form-group">
                <div className={error ? "form-map error" : "form-map"}>
                    
                    <i className={"first-child " + icon}/>
                    <span className="label"> {label}</span>
                    <div className="leaflet">
                        <Map
                            center={position}
                            attributionControl={false}
                            // onClick={this.handleClick}
                            ref="refMap"
                            zoom={zoom}
                            viewport={viewPort}
                            // onzoomend={this.onZoomLevelsChange}
                            // onViewportChanged={viewPort}
                            ref="refMap"
                        >
                            <TileLayer
                                attribution='<a href="http://osm.org/copyright"></a>'
                                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                            {marker}
                        </Map>
                    </div>
                </div>
                {error ? <label className="invalid-feedback">{error}</label> : null}
            </div>
        );
    }
}

export default MapFieldGroup;
