import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { Dimensions } from "react-native";

export default function App() {
  const screen_width = Dimensions.get("window").width;
  const screen_height = Dimensions.get("window").height;
  const default_location = {
    latitude: -23.644957,
    longitude: -46.528012,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02 * (screen_width / screen_height),
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        initialRegion={{ ...default_location }}
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
