import GoogleMapReact from "google-map-react";
import React, {Component} from 'react'; //React allows us to write html (JSX) in a JS file
import Marker from "./Marker.js";
import {landmarks} from "../const/Landmarks";



const mapStyles = {
    width: '300px',
    height: '300px'
}

class Map extends Component {
    state = {
        center: [36.0001557, -78.9442297],
        zoom: 15,
    };

    _onChange = ({center, zoom}) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    render() {
        return (
            <div style={{height: '20px', width: '20px'}}>
                <GoogleMapReact
                    style={mapStyles}
                    bootstrapURLKeys={{key: 'AIzaSyDQKkNsepBOaIiSSp4OUIFZGKmCOFTrho4'}}
                    // center={{lat: 36.0001557, lng: -78.9442297}}
                    size={{height: 100, width: 100}}
                    // zoom={14}
                    onChange={this._onChange}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    >
                    {
                        landmarks.map((item => {
                            console.log(item.lat);
                            return <Marker key={item.name} title={item.name} lat={item.lat} lng={item.long}/>
                        }))
                    }
                    {/*<Marker*/}
                    {/*    title = {"hello"}*/}
                    {/*    lat = {36}*/}
                    {/*    long = {-78}*/}
                    {/*>*/}
                    {/*</Marker>*/}
                </GoogleMapReact>
            </div>
        );
    }
};

export default Map;
