import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "./MapView";

export default function App() {
  const [position, setPosition] = useState(null);

  return (
    <View style={styles.container}>
      <MapView animateToPosition={position} />

      <View style={styles.btn}>
        <Button
          margin="10"
          onPress={() => {
            setPosition([-23.644957, -46.528012]);
          }}
          title={"Ir para ufabc"}
        />

        <Button
          onPress={() => {
            setPosition([51.505, -0.09]);
          }}
          title={"Voltar para cords anteriores"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  btn: {
    position: "relative",
    top: 0,
    left: 5,
    flexDirection: "column",
  },
});
