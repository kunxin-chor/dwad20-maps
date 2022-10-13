// all things related to retriving data with axios
// goes here
const API_BASE_URL="https://api.foursquare.com/v3/places/";
const API_KEY="fsq3rT+BnzZfpnt9RT+lTVdV0GRtyUV5eohCbIrpLGZZ7kw=";

const headers = {
    // tells the FourSquare API server that the format of data we are sending is JSON
    "Accept": "application/json",  
    // API key to use; the API_KEY identifies which project it is
    "Authorization": API_KEY
}

async function main() {
    let ll = "1.3521,103.8198"; // for leaflet, lag lng is an array, for foursquare, it's a string
    let url = API_BASE_URL + "search";
    console.log(url)
    let response = await axios.get(url,{
        "headers": headers,
        "params":{
            "ll": ll,
            "query":"chicken rice",
            "radius":25000,  // 25km
            "category": 13072,
            "limit":50,
            "v": '20210903'  // (Unique FourSquare) YYMMDD format (its for version control). I want to use your version of API dated before this date
        }
    });
    console.log(response.data);
}

main();