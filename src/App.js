import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import { map } from "./Map.js";

export default function App() {
  return (
    <View style={styles.container}>
      <WebView javaScriptEnabled={true} source={{ html: map }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
});
