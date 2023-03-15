const API_URL_findbyCoords = 'https://6awv2ej4h9.execute-api.eu-central-1.amazonaws.com/locations/findByCoords?';
const API_URL_findbyId = 'https://6awv2ej4h9.execute-api.eu-central-1.amazonaws.com/locations/findByID';

export async function getLocationsByCoords(lon, lat, maxDst = 50000) {
    try {
        let url = new URL(API_URL_findbyCoords + new URLSearchParams({
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

export async function getLocationById(id) {
    try{
        let url = API_URL_findbyId + '/'+id;
        let response = await fetch(url);  
        let location = await response.json();
        return location    
    } catch(error) {
        console.error("error in getLocationById function");
        return [];
    }  
}

