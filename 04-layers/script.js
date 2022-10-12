function getRandomLatLng(map) {
    // given a map, generate a random coordinate that is within the window of the map

    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest(); // lower-left corner
    let northEast = bounds.getNorthEast(); // upper-right corner

    // get the 'length' and 'height' of the map
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    // generate the random coordinate
    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [randomLat, randomLng]
}

window.addEventListener("DOMContentLoaded", function () {
    // typically coordinates are lat,lng
    // they are represented as an array
    // index 0 is lat, index 1 is lng
    let singapore = [1.3521, 103.8198];

    // create the map using the `L` object
    // (aka the Leaflet object)
    // it takes in one argument, the id of element that the map should be in
    // (no need # 'cos leaflet only allows id)
    let map = L.map('map');

    // set the center point of the map to Singapore
    // second argument: the starting zoom level
    map.setView(singapore, 13);

    // set up a tile layer
    // how are we going to draw the code 

    // the first argument where the map data is from
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        // copyright notice
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        // maximum zoom level
        maxZoom: 18,
        // controls the style of your map
        id: 'mapbox/streets-v11',
        // how big is one "square" on the map
        tileSize: 512,
        // ????
        zoomOffset: -1,
        // use your own access token for your own live project
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);  // <-- the map object that with 'L.map()'

    // After this point, we can add in our customization to our leaflet map

    // How to create a layer
    let group = L.layerGroup(); // Leaflet -- a layer is anything that is rendered (aka displayed) on top of the map
    // a layer group can contain of many layers

    for (let i = 0; i < 5; i++) {
        let randomMarker = L.marker(getRandomLatLng(map));
        randomMarker.addTo(group);
    }

    group.addTo(map);

    // Group 2 - random circles
    let group2 = L.layerGroup();
    // group2.addTo(map);
    for (let i =0; i < 5; i++) {
        let randomCircle = L.circle(getRandomLatLng(map), {
            'color': 'red',
            'fillColor': 'pink',
            'fillOpacity': 0.5,
            'radius':250
        });
        randomCircle.addTo(group2);
    }

    // Group 3 - green circles
    let group3 = L.layerGroup();
    // group3.addTo(map);
    for (let i =0; i < 5; i++) {
        let randomCircle = L.circle(getRandomLatLng(map), {
            'color': 'green',
            'fillColor': 'blue',
            'fillOpacity': 0.5,
            'radius':250
        });
        randomCircle.addTo(group3);
    }

    // we can control which layers to show and which to hide
    let baseLayers = {
        "Markers": group,
        "Red Circles": group2,
       
    }

    let overlays = {
        "Green Circles": group3
    }

    // L.control.layers(baseLayers, {}).addTo(map);
    // the first parameter of L.control.layers are the BASE LAYERS
    // ONLY ONE BASE LAYER CAN BE ACTIVATED AT A TIME
    // the second parameter of L.control.layers are the OVERLAYS
    let controls = L.control.layers(baseLayers, overlays);
    controls.addTo(map);

    document.querySelector("#show-circles")
        .addEventListener("click", function(){
            // use the addLayer function to add
            // a layer to the map (the layer can be a marker, a shape, or a layer group)
            map.addLayer(group3)
        })

    document.querySelector("#hide-circles")
        .addEventListener("click", function(){
            // remove a layer from the map
            // (no error if the layer wasn't in the map to begin with)
            map.removeLayer(group3);
        })

    document.querySelector("#toggle-circles")
        .addEventListener("click", function(){
            // we use 'hasLayer' to determine if a layer is already showing in the map
            if (map.hasLayer(group3)) {
                // green circles is already showing so hide it
                map.removeLayer(group3);
            } else {
                // green circle is not showing, we display it
                map.addLayer(group3);
            }
        })
})
