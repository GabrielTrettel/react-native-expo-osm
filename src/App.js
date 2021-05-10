import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

import WebViewLeaflet from "react-native-webview-leaflet";

const mapboxToken =
  "pk.eyJ1IjoiZ2FicmllbC10cmV0dGVsIiwiYSI6ImNrb2RjNWIzYjAwczIyd25yNnUweDNveTkifQ.xRASmGTYm0ieS-FjVrXSjA";

const mapLayers = {
  name: "streets", // the name of the layer, this will be seen in the layer selection control
  checked: "true", // if the layer is selected in the layer selection control
  type: "TileLayer", // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
  baseLayer: true,
  // url of tiles
  url: `https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=${mapboxToken}`,
  // attribution string to be shown for this layer
  attribution:
    "&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors",
};

export default function App() {
  const mapViewRef = null;

  const onLoad = (event) => {
    // log a message showing the map has been loaded
    console.log("onLoad received : ", event);

    mapViewRef.sendMessage({
      mapLayers,
    });
  };

  const onReceive = (event) => {
    // log a message showing the map has been loaded
    console.log("onLoad received : ", event);
  };

  const screen_width = Dimensions.get("window").width;
  const screen_height = Dimensions.get("window").height;
  const default_location = {
    latitude: -23.65717,
    longitude: -46.69947,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02 * (screen_width / screen_height),
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <WebViewLeaflet
          ref={(component) => (mapViewRef = component)}
          style={styles.map}
          onMessageReceived={onReceive}
          mapLayers={mapLayers}
          onLoad={onLoad}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
});
