import axios from 'axios';

const API_URL = '/locations/add'

const addLocationWithcoordinates = async (locationData) => {

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }

    const response = await axios.post(API_URL, locationData, config)

}

const locationHandler = {
    addLocationWithcoordinates
}

export default locationHandler
