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

