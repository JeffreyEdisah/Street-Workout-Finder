const API_URL = 'https://6awv2ej4h9.execute-api.eu-central-1.amazonaws.com/locations/findByCoords?';

export async function getLocationsByCoords(lon, lat, maxDst = 50000) {
    try {
        let url = new URL(API_URL + new URLSearchParams({
            lon: lon,
            lat: lat,
            maxDst: maxDst
        }))
        let response = await fetch(url);
        let responseText = await response.text();
        return responseText
    } catch(error) {
        console.error("error in getAllLocations function")
        return [];
    }  
}

// Todo: implement more functions to get locations by other parameters