export const map = String.raw`
<!DOCTYPE html>
<html>
<head>
	<title>Mobile tutorial - Leaflet</title>

	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>


	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		#map {
			width: 600px;
			height: 400px;
		}
	</style>

	<style>body { padding: 0; margin: 0; } #map { height: 100%; width: 100vw; }</style>
</head>
<body>

<div id='map'></div>

<script>
	var mymap = L.map('map').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2FicmllbC10cmV0dGVsIiwiYSI6ImNrb2RjNWIzYjAwczIyd25yNnUweDNveTkifQ.xRASmGTYm0ieS-FjVrXSjA', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);


    var markers = {};


	var popup = L.popup();

	function onMapClick(e) {
		var payload = {
			code: 1,
			content: {
				latitude: e.latlng.lat.toString().slice(0,8),
				longitude: e.latlng.lng.toString().slice(0,8),
			}
		}
		window.ReactNativeWebView.postMessage(JSON.stringify(payload));
		}

      function onPopupClick(e) {
        var payload = {
          code: 2,
          content: this.options.ID,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(payload));
      }

	mymap.on("popupopen", onPopupClick);
	mymap.on('click', onMapClick);
</script>
</body>
</html>
`;
