import parseAddress from "./parseAddress";
import { Coordinates } from "../../proto/apis_pb";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function testapimapcall(string) {
  var address = parseAddress(string);
  console.log(address);

  fetch(address)
    .then(res => res.json())
    .then(response => {
      var coords = new Coordinates();
      var latlng = response.results[0].geometry.location;
      coords.setLatitude(latlng.lat);
      coords.setLongitude(latlng.lng);
      return response;
    });
}
