import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

var queue = [];
var timerQue = {};
var timer = null;
class MapContainer extends Component {
  //constructor for your marker
  const;
  constructor(props) {
    super(props);
    var queue = [];
    this.state = {
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "Yrll",
          position: { lat: 37.334061, lng: -121.879591 },
        },
      ],
    };
    this.mapClicked = this.mapClicked.bind(this);
  }

  //function for clicking on the map
  mapClicked(mapProps, map, clickEvent) {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    console.log(lat, lng);
    queue.push({ lat, lng });
    if (timer == null) {
      timer = setTimeout(() => {
        let firstElement = queue[0];
        if (!firstElement) {
          timer = null;
          return;
        }
        let temp = JSON.parse(this.props.commands.current);
        temp.lat = firstElement.lat;
        temp.lng = firstElement.lng;
        this.props.commands.current = JSON.stringify(temp);
        timer = null;
        console.log(this.props.commands.current);
      }, [10000]);
    }

    this.setState((previousState) => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng },
          },
        ],
      };
    });
  }
  onMarkerClick = (props, marker, e) => {
    console.log(e);
    const lat = e.latLng.lat().toString();
    const lng = e.latLng.lng().toString();
    const coordinates = lat + ", " + lng;
    let markExitst = this.state.markers.filter(
      (item) => item.position.lat == lat && item.position.lng == lng
    );
    console.log("current mark", this.state.markers);
    console.log("lat=>", lat, "log=>", lng);
    console.log("mark", markExitst);
    if (markExitst.length !== 0) {
      for (let i = 0; i < this.state.markers.length; i++) {
        if (
          this.state.markers[i].position.lat == lat &&
          this.state.markers[i].position.lng == lng
        ) {
          this.state.markers.splice(i, 1);
          this.setState({ markers: this.state.markers });
          queue.splice(i, 1);
          return;
        }
      }
    }
    console.log(coordinates);
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
      coordinate: coordinates,
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.mapClicked}
        style={{ width: "100%", height: "100%" }}
        zoom={10}
        initialCenter={{
          lat: 37.334061,
          lng: -121.879591,
        }}
      >
        {this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            title={marker.title}
            name={marker.name}
            position={marker.position}
            onClick={this.onMarkerClick}
            onContextMenu={this}
          ></Marker>
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <p1>{this.state.coordinate}</p1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBu3arSboQ85q29cs3L7B1GLPjVsN4VO5o",
})(MapContainer);
