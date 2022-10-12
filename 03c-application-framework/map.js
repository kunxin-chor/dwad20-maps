// this is a global function
// BECAUSE it is not in any scope (it's not in curly braces)
function initMap(centerPoint, zoomLevel) {
    // let centerPoint = [1.3521, 103.8198];

    // create the map object
    // --> first argument is to be the <div> that holds the map
    let map = L.map('map');

    // set the centerpoint to be singapore
    map.setView(centerPoint, zoomLevel);
    
    // create the tile layer with BOILERPLATE code
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

    return map;  // return the leaflet map that we have just created as a result
                 // because other functions want to use it

}