import React from 'react';

function Comment(props) {
  
    return (
      <div className="comment">
        <img className='avatar' src={require("./RCO075_1605492406.jpg")} alt="Profile"/>
        <div className='commentText'>
        <h3>{props.pseudo}</h3>
        <p>{props.comment}</p>
        </div>
      </div>
    );
  }

export default Comment;