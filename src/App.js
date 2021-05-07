import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";

import MapboxGL from "@react-native-mapbox-gl/maps";
MapboxGL.setAccessToken("<Token>");
MapboxGL.setConnected(true);

export default function App() {
  MapboxGL.setTelemetryEnabled(false);

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
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});
