import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { map } from "./Map.js";

const goToPosition = (mapRef, lat, long) => {
  mapRef.injectJavaScript(`mymap.setView([${lat}, ${long}], 13);`);
};

export default function MapView({ animateToPosition }) {
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    animateToPosition != null && goToPosition(mapRef, ...animateToPosition);
  });

  return (
    <WebView
      ref={(webViewRef) => {
        setMapRef(webViewRef);
      }}
      onMessage={(event) => {
        console.log(event.nativeEvent.data);
        alert(
          "Sou um componente nativo! valores optidos pelo JS da webview: " +
            event.nativeEvent.data
        );
      }}
      javaScriptEnabled={true}
      source={{ html: map }}
    />
  );
}
