// Use DOMContentLoaded as our main entry point
window.addEventListener("DOMContentLoaded", async function () {
    
    // this function is to setup the application
    function init() {
        let map = initMap();

        // add a layer to store the search results
        let searchResultLayer = L.layerGroup();
        searchResultLayer.addTo(map);

        document.querySelector("#btnToggleSearch").addEventListener("click", function(){
            let searchContainerElement = document.querySelector('#search-container');
            let currentDisplay = searchContainerElement.style.display;
            if (! currentDisplay || currentDisplay=='none') {
                // if it is not visible
                searchContainerElement.style.display = "block";

            } else {
                searchContainerElement.style.display = "none";
            }
        })

        document.querySelector("#btnSearch").addEventListener("click", async function(){
            // remove all the existing markers first before adding the new ones
            searchResultLayer.clearLayers();

            let searchTerms = document.querySelector("#searchTerms").value;
            let boundaries = map.getBounds();
            let center = boundaries.getCenter();  // in lat lng
            let latLng = center.lat + "," + center.lng; // Foursquare expects lat lng to be in the format "lat,lng"
            let searchResults = await search(latLng, searchTerms, 5000);
            
            let searchResultElement = document.querySelector("#results");

            for (let r of searchResults.results) {

                console.log(r);
                // Display the marker
                let lat = r.geocodes.main.latitude;
                let lng = r.geocodes.main.longitude;
                let marker = L.marker([lat,lng]).addTo(searchResultLayer);
                // marker.bindPopup(`<h1>${r.name}</h1>`)

                marker.bindPopup( function(){
                 
                    let el = document.createElement('div');
                    // add the 'popup' class to the <div>
                    // see style.css for its definition
                    el.classList.add("popup")
                    el.innerHTML = `<h1>${r.name}</h1>`
                    async function getPicture() {
                        let photos = await getPhoto(r.fsq_id);
                        let firstPhoto = photos[0];
                        let url = firstPhoto.prefix + "original" + firstPhoto.suffix;
                        el.innerHTML += `<img src="${url}"/>`
                    }

                    getPicture();
                    return el;
                })

                // add to the search results
                let resultElement = document.createElement("div");
                resultElement.innerText = r.name;
                resultElement.classList.add("search-result");

                // the second parameter is an anonymous function
                // inside its scope, we refer to `r` which is not is own local variable
                // and it is not a global variable (i.e it's the local variable of another scope)
                // therefore the created anoymous function will remember for itself what 'r'
                // stores when it is created. (Also known as a closure)
                resultElement.addEventListener("click", function(){
                    map.flyTo([r.geocodes.main.latitude, r.geocodes.main.longitude], 16);
                    marker.openPopup(); // show the bind popup for the marker
                })

                searchResultElement.appendChild(resultElement);

            }

        });
    }

    init();
  

})

function initMap() {
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

     return map; // return map as result of the function
}