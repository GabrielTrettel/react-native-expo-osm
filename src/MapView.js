import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { map } from "./Map.js";

const code_to_function = {
  "1": clickCallback,
  "2": clickCallback,
};

function clickCallback(payload, props) {
  console.log(payload.content);
  props.clickListener(JSON.stringify(payload.content));
}

function parseInput(event, props) {
  // console.log(event);
  const payload = JSON.parse(event);
  // console.log(payload);

  code_to_function[payload.code](payload, props);
}

function insertMarker(mapRef, props) {
  console.log(props);
  mapRef.injectJavaScript(`
  var layer = L.marker([${props.cords.lat}, ${props.cords.long}], {ID: ${props.ID}}    )
  layer.ID = ${props.ID}
  layer.addTo(mymap).bindPopup("<b>${props.title}</b><br />I am a popup.");`);
}

function aplyLayers(mapRef, layer) {
  console.log(layer);
  // marker declarado em Map.js

  if (layer == true) {
    mapRef.injectJavaScript(`
      mymap.addLayer(marker[0]);`);
  }
  else if (layer == false) {
    mapRef.injectJavaScript(`    
    mymap.removeLayer(marker[0]);`);
  }
}

function goToPosition(mapRef, lat, long) {
  mapRef.injectJavaScript(`mymap.setView([${lat}, ${long}], 13);`);
}

export default function MapView(props) {
  const [mapRef, setMapRef] = useState(null);
  const [finishedLoad, setFinishedLoad] = useState(false);

  props.animateToPosition != null &&
    goToPosition(mapRef, ...props.animateToPosition);

  mapRef != null && props.layers != null && aplyLayers(mapRef, props.layers);

  const onLoad = () => {
    props.markersList != null &&
      props.markersList.length > 0 &&
      props.markersList.map((m) => insertMarker(mapRef, m));
  };

  //const onLayers = () => {
  //  props.layers != null && aplyLayers(mapRef, props.layers);
  // console.log("NÃAAO FUNCIONA");
  // };

  useEffect(() => {
    mapRef != null && onLoad();
    // mapRef != null  && onLayers();
  }, [finishedLoad]);

  return (
    <WebView
      ref={(webViewRef) => {
        setMapRef(webViewRef);
      }}
      onMessage={(event) => {
        parseInput(event.nativeEvent.data, props);
      }}
      javaScriptEnabled={true}
      source={{ html: map }}
      onLoad={() => {
        setFinishedLoad(true);
      }}
    />
  );
}
