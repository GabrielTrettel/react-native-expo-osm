import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "./MapView";

export default function App() {
  const [position, setPosition] = useState(null);
  const [clickListener, setClickListener] = useState("");
  const [layers, setLayers] = useState(false);

  const markers = [
    {
      ID: "1",
      title: "Casa da Lívia",
      cords: {
        lat: 51.505,
        long: -0.09,
      },
    },
    {
      ID: "2",
      title: "Casa do Daniel",
      cords: {
        lat: 51.5032,
        long: -0.09589,
      },
    },
  ];
  return (
    <View style={styles.container}>
      <MapView
        animateToPosition={position}
        clickListener={setClickListener}
        markersList={markers}
        layers={layers}
      />

      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            setPosition([-23.644957, -46.528012]);
          }}
        >
          <Text style={styles.txt}>UFABC</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            setPosition([51.505, -0.09]);
          }}
        >
          <Text style={styles.txt}>Londres</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => {
            setLayers(!layers);
            //console.log(layers);
          }}
        >
          <Text style={styles.txt}>Aplicar camadas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.callback}>
        <Text style={styles.txt}>{clickListener}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 60,
  },
  callback: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "gray",
    width: "80%",
    padding: 10,
  },
  btn: {
    width: "80%",
    position: "absolute",
    top: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
  },
  btns: {
    backgroundColor: "dodgerblue",
    borderRadius: 10,
    width: 100,
    padding: 10,
    margin: 4,
    alignItems: "center",
  },
  txt: {
    color: "white",
  },
});
