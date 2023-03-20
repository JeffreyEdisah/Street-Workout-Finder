import { useState } from 'react';

function AddTool() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        onClick={toggleMenu}
      >
        <span style={{color:'black'}}>+</span>
      </div>
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '10vh',
            left: '50vw',
            width: '100px',
            height: '70px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px',
            zIndex: '900'
          }}
        >
          <a href="#">Option 1</a>
          <a href="#">Option 2</a>
          <a href="#">Option 3</a>
        </div>
      )}
    </div>
  );
}

export default AddTool;
