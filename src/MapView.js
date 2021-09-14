import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import {map} from "./Map";


const code_to_function = {
  "1": clickCallback,
  "2": markerCallback,
};

function clickCallback(payload, props) {
  const cords = JSON.stringify(payload.content);
  console.log("payload content: " + cords);
  props.clickListener(cords);
}

function markerCallback(payload, props) {
  const markerID = JSON.stringify(payload.content);
  console.log("payload content: " + JSON.stringify(payload.content));
  props.markersListener(markerID)


}

function parseInput(event, props) {
  const payload = JSON.parse(event);
  code_to_function[payload.code](payload, props);
}


async function insertMarker(mapRef, ID, cords, icon) {
  mapRef.injectJavaScript(`
  var customIcon = L.divIcon({
    className: 'marker-class',
    html: \`<body>${icon}</body>\`,
    iconSize: 50
  });

  // Check if there is no other marker with same ID already in map
  if (!(${ID} in markers)) {
    // Creates marker object
    markers[${ID}] = L.marker([${cords.lat}, ${cords.long}], {icon: customIcon, ID: ${ID}});

    // Add marker to map and bind callback event to its function
    markers[${ID}].addTo(mymap).on('click', onPopupClick);
  }`);
}

function goToPosition(mapRef, lat, long) {
  mapRef.injectJavaScript(`mymap.setView([${lat}, ${long}], 13);`);
}

export default function MapView(props) {
  const [mapRef, setMapRef] = useState(null);
  const [finishedLoad, setFinishedLoad] = useState(false);


  props.animateToPosition != null &&
    goToPosition(mapRef, ...props.animateToPosition);

  const onLoad = () => {
    props.markersList != null &&
      props.markersList.length > 0 &&
      props.markersList.map(({ID, cords, icon}) => insertMarker(mapRef, ID, cords, icon));
  };

  useEffect(() => {
    mapRef != null && onLoad();
  }, [finishedLoad]);

  return (
    <View flex={1}>
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
    </View>
  );
}
