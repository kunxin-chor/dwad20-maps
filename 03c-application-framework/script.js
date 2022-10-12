// When we organise our code,
// we organise EIPO
// 1. EIPO
// the first 'event' is initialization
// the program starts up or it being
// setup 
// ENTRY POINT INTO THE APPLICATION 
window.addEventListener("DOMContentLoaded", async function () {
    // the 'initMap' function is from 'map.js'
    // any function or variables declared in the GLOBAL scope
    // in any JS file is shared with all other JS files.
    let map = initMap([1.3521, 103.8198], 13);
    let taxis = await loadData();
   
    setInterval(async function () {
        console.log("Time up")
        markerClusterLayer.clearLayers();  // remove all the existing markers
        let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
        let coordinates = response.data.features[0].geometry.coordinates;
        for (let c of coordinates) {
            let lat = c[1];  // because the coordinates are in the [lng, lat], we have to reformat [lat, lng]
            let lng = c[0];
            let marker = L.marker([lat, lng]);
            marker.bindPopup(`<p>${lat}, ${lng}</p>`)
            marker.addTo(markerClusterLayer)
        }
    }, 1000 * 30);

    render(map, taxis);
})

function render(map, taxis) {
    let markerClusterLayer = L.markerClusterGroup(); // <-- only available because we included the marker cluster JS file
    markerClusterLayer.addTo(map);
    for (let t of taxis) {
        let lat = t[1];
        let lng = t[0];
        let marker = L.marker([lat,lng]);
        marker.addTo(markerClusterLayer);
    }
}

async function loadData() {
    let response = await axios.get("https://api.data.gov.sg/v1/transport/taxi-availability");
    return response.data;
}