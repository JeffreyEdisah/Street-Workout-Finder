import React from 'react';

function Head(props) {

    return (
      <div className='description-location'>
      <div className='image-container'>
        {/* <img src={require("./RCO075_1605492406.jpg")}/> */}
      </div>
      <h1>Nom du lieu</h1>
      <p>Adresse du lieu</p>
      <div className='common-intel'>
      <p>Ouvert</p>
      <div className='note'>
      <p>NOTE</p>
      </div>
      </div>
      </div>
    );
  }

export default Head;