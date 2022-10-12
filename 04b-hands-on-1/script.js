// using the DOMContentLoaded for two reasons
// 1. it's a recongizable and easily located starting point
// 2. we need to use `await axios.get` anyway so it's a good place to 
// have async function
window.addEventListener("DOMContentLoaded", async function () {
    // initialization (the aka setup step)
    let map = L.map("map");
    map.setView([1.3521, 103.8198], 13);

    // setup the tile layer
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

    // Setup is done: map should be ready

    // Reading in JSON file: INPUT PHASE
    let hdbResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/57f353d0aaa51805cd9bbe6bdcb12cb86e6068da/hdb.json");
    
    let mallResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/57f353d0aaa51805cd9bbe6bdcb12cb86e6068da/malls.json");
   
    let natureResponse = await axios.get("https://gist.githubusercontent.com/kunxin-chor/a5f5cab3e8a6ad0868134334c1432d9a/raw/57f353d0aaa51805cd9bbe6bdcb12cb86e6068da/nature.json");

    // Create the layer groups
    let hdbLayer = L.layerGroup();
    for (let hdb of hdbResponse.data) {
        let marker = L.marker(hdb.coordinates);
        marker.bindPopup(`<h1>${hdb.name}</h1>`);
        marker.addTo(hdbLayer);
    }
    hdbLayer.addTo(map);

    let mallLayer = L.layerGroup();
    for (let mall of mallResponse.data) {
        let marker = L.marker(mall.coordinates);
        marker.bindPopup(function(){
            // you can use any JS in this function
            // the only requirement is you must RETURN a HTML string
            // eg. use axios to get more info
            // eg. you read info from text boxes, radio buttons etc.
            // eg. if you use createElement here you can also add event listener to the element
            // you created
            return `<h1>${mall.name}</h1>`;
        })
        marker.addTo(mallLayer);
    }
    mallLayer.addTo(map);

    let natureLayer = L.layerGroup();
    for (let nature of natureResponse.data) {
        console.log(nature.coordinates);
        L.marker(nature.coordinates).bindPopup(function(){
            let divElement = document.createElement('div');
            let button = document.createElement("button");
            button.innerText = "Click me";
            button.addEventListener("click", function(){
                alert(nature.name)
            })
            divElement.appendChild(button);
            return divElement; // Leaflet will take the returned element and do the necessary appendChild for us
     
        }).addTo(natureLayer);
    }
    natureLayer.addTo(map);

})