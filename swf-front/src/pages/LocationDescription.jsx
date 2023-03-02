import React from "react";
import Head from "../components/Head"
import TagContainer from "../components/TagContainer";
import CommentContainer from "../components/CommentContainer";

function LocationDescription(props){
    return(
        <div className="location-page">
            <Head />
            <hr />
            <TagContainer />
            <hr />
            <CommentContainer />
        </div>
    );
}

export default LocationDescription;