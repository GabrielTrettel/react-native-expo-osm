import React, { useEffect, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const HTML_FILE_PATH = require(`./Map.html`);

const loadHTMLFile = async () => {
  try {
    const [{ localUri }] = await Asset.loadAsync(HTML_FILE_PATH);
    const fileString = await FileSystem.readAsStringAsync(localUri);

    return fileString;
  } catch (error) {
    console.warn(error);
    console.warn("Unable to resolve index file");
  }
};

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

function goToPosition(mapRef, lat, long) {
  mapRef.injectJavaScript(`mymap.setView([${lat}, ${long}], 13);`);
}

export default function MapView(props) {
  const [mapRef, setMapRef] = useState(null);
  const [finishedLoad, setFinishedLoad] = useState(false);
  const [webviewContent, setWebviewContent] = useState(null);

  loadHTMLFile()
    .then((html) => setWebviewContent(html))
    .catch((e) => console.warn(e));

  props.animateToPosition != null &&
    goToPosition(mapRef, ...props.animateToPosition);

  const onLoad = () => {
    props.markersList != null &&
      props.markersList.length > 0 &&
      props.markersList.map((m) => insertMarker(mapRef, m));
  };

  useEffect(() => {
    mapRef != null && onLoad();
  }, [finishedLoad]);

  console.log(webviewContent);
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
        source={{ html: webviewContent }}
        onLoad={() => {
          setFinishedLoad(true);
        }}
      />
    </View>
  );
}
