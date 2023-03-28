import React, { useEffect, useState } from "react";
import Head from "../components/Head"
import TagContainer from "../components/TagContainer";
import CommentContainer from "../components/CommentContainer";
import { useLocation } from "react-router-dom";
import { getLocationById } from "../services/locationService";

function LocationDescription(props) {

    const { state } = useLocation();
    let [object, setObject] = useState({})

    useEffect(()=> {
        async function fetchData(){
        const data = await getLocationById(state.id);
        setObject(data);
        }
        fetchData()
        .catch(console.error);},[state.id, object])

    return (
        <div className="location-page">
            <Head name={object.name} street={object.address?.street} zipCode={object.address?.zipCode} city={object.address?.city} />
            <hr />
            {/* <TagContainer />
            <hr />
            <CommentContainer /> */}
        </div>
    );
}

export default LocationDescription;