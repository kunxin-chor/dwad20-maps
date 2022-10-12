// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function () {

    // SETUP //////////////////////////////////////////////////////////////////
    // create a map object
    let map = L.map('map');
    // set the center point and the zoom
    map.setView([1.29, 103.85], 13);

    // need set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);

    let taxiLayer = L.markerClusterGroup();  // create the new Marker Cluster layer
    taxiLayer.addTo(map)

    let busStopLayer = L.markerClusterGroup(); // create the new Marker Cluster layer
    // busStopLayer.addTo(map);

    // Setup Controls
    let baseLayers = {
        'Taxi': taxiLayer,
        'Bus': busStopLayer
    }

    // let layerControl = L.control.layers(baseLayers, {});
    // layerControl.addTo(map);

    L.control.layers(baseLayers, {}).addTo(map);

    //////////////////////////////////////////////////////////////////////////

    // INPUT 

    let taxiResponse = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    let taxiData = taxiResponse.data;

    let busStopResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/b0a3e50161cd7a53d1bcdc5cc93b11fe/raw/05716c38af2b960d0f34d4db1fef6ce38d42455e/bus-stop.json");
    let busStopData = busStopResponse.data;

    // TAXI LAYER
    for (let t of taxiData.features[0].geometry.coordinates) {
        // let lat = t[1];
        // let lng = t[0];
        // let marker = L.marker([lng,lat])
        let marker = L.marker([ t[1], t[0]]);
        marker.addTo(taxiLayer);
    }

    // BUS STOP LAYER
    // use the for...in to get each key
    for (let busStopKey in busStopData) {
        let busStop = busStopData[busStopKey];
        // console.log(busStop);
        let coordinate = new Array(busStop[1], busStop[0]); // => [ busStop[1], busStop[0]]
        let circle = L.circle(coordinate, {
            'color':'blue',
            'fillColor':'purple',
            'fillOpacity':0.5,
            'radius':25
        });
        circle.addTo(busStopLayer)
    }



})
