import React from 'react';

function AddTool() {
  const redirectToPage = () => {
    if (localStorage.getItem("token")) {
      window.location.href = './addlocation';
    } else {
      window.location.href = './login';
    }

  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          bottom:  '40px',
          left: '50vw',
          zIndex: '900', 
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
        }}
        onClick={redirectToPage}
      >
        <span style={{color:'black'}}>+</span>
      </div>
    </div>
  );
}

export default AddTool;
