import React, { useEffect, useState } from "react";
import Head from "../components/Head"
import TagContainer from "../components/TagContainer";
import CommentContainer from "../components/CommentContainer";
import { useLocation } from "react-router-dom";
import { getLocationById } from "../services/locationService";
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

function LocationDescription(props) {

    const { state } = useLocation();
    let [object, setObject] = useState({})

    useEffect(()=> {
        async function fetchData(){
        const data = await getLocationById(state.id);
        setObject(data);
        }
        fetchData();},[state.id, object])

    return (
        <>
        <Link to={"/"}>
        <BsArrowLeftShort className="arrow" size={30} />
      </Link>
        <div className="location-page">
            <Head name={object.name} street={object.address?.street} zipCode={object.address?.zipCode} city={object.address?.city} />
            <hr />
            <TagContainer />
            <hr />
            <CommentContainer />
        </div>
        </>
    );
}

export default LocationDescription;