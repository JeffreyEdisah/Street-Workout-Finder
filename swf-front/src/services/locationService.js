export async function getAllLocations(lon, lat, maxDst = 50000) {
    try {
        let response = await fetch('http://127.0.0.1:5000/locations/findByCoords?' + new URLSearchParams({
            lon: lon,
            lat: lat,
            maxDst: maxDst
        }));
        let responseText = await response.text();
        console.log(responseText);
        return responseText
    } catch(error) {
        console.error("error in getAllLocations function")
        return [];
    }
    
}