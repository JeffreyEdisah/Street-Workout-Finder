import React from 'react';

function Head(props) {

  return (
    <div className='description-location'>
      <div className='image-container'>
        {<img src={require("../images/location_placeholder.jpg")}/>}
      </div>
      <h1>{props.name}</h1>
      <p>{props.street +', ' + props.zipCode +' '+ props.city}
      </p>
      <div className='common-intel'>
        <p>Ouvert</p>
      </div>
      </div>
  );
}

export default Head;