import React from "react";
import Head from "../components/Head"
import TagContainer from "../components/TagContainer";
import CommentContainer from "../components/CommentContainer";
import { useLocation } from "react-router-dom";

function LocationDescription(props) {

    const { state } = useLocation();

    console.log("state : ", state);

    return (
        <div className="location-page">
            <div>
                <strong>Id:</strong> {state.id}{" "}
            </div>
            <Head />
            <hr />
            {/* <TagContainer />
            <hr />
            <CommentContainer /> */}
        </div>
    );
}

export default LocationDescription;