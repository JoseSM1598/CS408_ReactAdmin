import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  HeatMap
} from "google-maps-react";
import { circle_style } from "../const/circle_style";
// import Marker from "../Components/Marker"

// import webpack from 'webpack';
import dotenv from "dotenv";

const gradient = [
  "rgba(0, 255, 255, 0)",
  "rgba(0, 255, 255, 1)",
  "rgba(0, 191, 255, 1)",
  "rgba(0, 127, 255, 1)",
  "rgba(0, 63, 255, 1)",
  "rgba(0, 0, 255, 1)",
  "rgba(0, 0, 223, 1)",
  "rgba(0, 0, 191, 1)",
  "rgba(0, 0, 159, 1)",
  "rgba(0, 0, 127, 1)",
  "rgba(63, 0, 91, 1)",
  "rgba(127, 0, 63, 1)",
  "rgba(191, 0, 31, 1)",
  "rgba(255, 0, 0, 1)"
];

const API_KEY = process.env.REACT_APP_MAPAPI_KEY;
console.log(API_KEY);

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) => {
    console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  positions = this.props.QList.map(item => {
    return {
      lat: item
        .getSpace()
        .getCoordinates()
        .getLatitude(),
      lng: item
        .getSpace()
        .getCoordinates()
        .getLongitude()
    };
  });

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <div className="map-container">
        <Map
          initialCenter={{
            lat: 36.0001557,
            lng: -78.9442297
          }}
          className={"map"}
          google={this.props.google}
          zoom={14}
        >
          {this.props.QList.map(item => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                style={circle_style}
                name={item.getSpace().getName()}
                title={item.getQuestion().getQuestionText()}
                position={{
                  lat: item
                    .getSpace()
                    .getCoordinates()
                    .getLatitude(),
                  lng: item
                    .getSpace()
                    .getCoordinates()
                    .getLongitude()
                }}
              />
            );
          })}

          {this.props.spaceData.map(item => {
            return (
              <Marker
                style={circle_style}
                name={item.getName()}
                position={{
                  lat: item.getCoordinates().getLatitude(),
                  lng: item.getCoordinates().getLongitude()
                }}
              />
            );
            // return <Marker style = {circle_style} name={item.name} title={item.name} lat={item.lat} lng={item.long}/>
          })}

          {/*<InfoWindow*/}
          {/*  marker={this.state.activeMarker}*/}
          {/*  visible={this.state.showingInfoWindow}*/}
          {/*>*/}
          {/*  <div>*/}
          {/*    <h4>{this.state.selectedPlace.name}</h4>*/}
          {/*    <h5>{this.state.selectedPlace.title}</h5>*/}
          {/*  </div>*/}
          {/*</InfoWindow>*/}
          {/*<HeatMap*/}
          {/*  gradient={gradient}*/}
          {/*  positions={this.positions}*/}
          {/*  opacity={0.3}*/}
          {/*  radius={20}*/}
          {/*/>*/}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY,
  libraries: ["visualization"]
})(MapContainer);
