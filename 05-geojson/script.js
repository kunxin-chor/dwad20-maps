// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function () {

    // SETUP //////////////////////////////////////////////////////////////////
    // create a map object
    let map = L.map('map');
    // set the center point and the zoom
    map.setView([1.29, 103.85], 12);

    // need set up the tile layer
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
    }).addTo(map);

    //////////////////////////////////////////////////////////////////////////

    // INPUT //
    let cyclingPathResponse = await axios.get("cycling-path-network-geojson.geojson");
    let cyclingLayer = L.geoJson(cyclingPathResponse.data,{
        // a function that will be applied to each feature in geojson data
        // i.e a function that will be applied to each PATH in the geojson data
        onEachFeature:function(feature, layer){
        
            // so the feature parameter is raw data the path or shape that is currently being drawn
            // the actual shape is the second parameter - layer
            let dummyElement = document.createElement("div");
            // feature.properties.Description is a string that contain some HTML
            // by setting to be the innerHTML of an element, the element contains
            // all the tags that were defined in the string
            dummyElement.innerHTML = feature.properties.Description;
            

            // search within the dummy element
            let tableColumns = dummyElement.querySelectorAll("td");
            let region = tableColumns[0].innerText;  // the region will be in the first table column
            let agency = tableColumns[1].innerText; // the region will be in the second table column

            layer.bindPopup(`<h1>${region} (maintained by ${agency})</h1>`);

        }
    }).addTo(map);
    // use setStyle to set the styling for the layer (it's not css, but using Leaflet own syntax)
    cyclingLayer.setStyle({
        'color': 'red',
        'strokeWidth':2,
        'fillColor': 'green'
    })

    let parkResponse = await axios.get("nparks-tracks-geojson.geojson");
    let parkLayer = L.geoJson(parkResponse.data, {
        onEachFeature:function(feature, layer) {
            let dummyElement = document.createElement("div");
            // convert the HTML string into DOM obejcts
            dummyElement.innerHTML = feature.properties.Description;
            let firstTableColumn = dummyElement.querySelector('td');
            let parkName = firstTableColumn.innerText;

            // `layer` variable represents the line or shape that is being drawn on the map
            layer.bindPopup(`<h1>${parkName}</h1>`)
      
        }
    });
    parkLayer.addTo(map); 
    parkLayer.setStyle({
        'color': 'green'
    })

    let overlayLayers = {
        'Cycling': cyclingLayer,
        'Parks': parkLayer
    }

    L.control.layers({}, overlayLayers).addTo(map);
})