const API_URL = 'http://127.0.0.1:5000/locations/findByCoords?';

export async function getAllLocations(lon, lat, maxDst = 50000) {
    try {
        let response = await fetch(API_URL + new URLSearchParams({
            lon: lon,
            lat: lat,
            maxDst: maxDst
        }));
        let responseText = await response.text();
        return responseText
    } catch(error) {
        console.error("error in getAllLocations function")
        return [];
    }  
}