import axios from 'axios';

const API_URL = 'http://localhost:5000/locations/add'

const addLocationWithcoordinates = async (locationData) => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }

    const response = await axios.post(API_URL, {name: locationData.name, address: {street: locationData.street, city: locationData.city, zipCode: locationData.zipCode, equipment: locationData.equipment}, geolocation: {type: "Point", coordinates: [locationData.longitude, locationData.latitude]}}, config)

}

const locationHandler = {
    addLocationWithcoordinates
}

export default locationHandler
