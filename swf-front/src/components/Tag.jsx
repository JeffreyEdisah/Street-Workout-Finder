import React from 'react';

function Tag(props) {
  
    return (
      <div className="tag" style={{color: props.color}}>
          {props.equipement}
      </div>
    );
}

export default Tag;