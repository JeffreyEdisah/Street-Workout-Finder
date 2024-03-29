import React, { useState,  useEffect  } from 'react';
import menuIcon from '../images/charm_menu-hamburger.svg';

const SlidingMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLocalStorageEmpty, setIsLocalStorageEmpty] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        setIsLocalStorageEmpty(true);}}, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="sliding-menu-container">
      <button
        className="open-menu-button"
        onClick={toggleMenu}
        style={{ display: menuOpen ? 'none' : 'block' }}
      >
        <img src={menuIcon} />
      </button>

      <div className={`sliding-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <button className="close-menu-button" onClick={toggleMenu}>
            <span className="red-cross">&#x2715;</span>
          </button>
        </div>

        <div className="menu-content">
          {isLocalStorageEmpty ? (<div className='menu-item'> <a href="./login"> Se connecter </a></div> 
          ) : (<div className='menu-item'> <a href="./logout"> Se déconnecter </a></div>)}
          <div className='menu-item'> <a href="./login"> Favoris </a></div>
          <div className='menu-item'> <a href="./login"> Profil </a></div>
          {isLocalStorageEmpty ? null : <div className='menu-item' id="suppression">Supprimer son compte</div>}
        </div>
      </div>
    </div>
  );
};

export default SlidingMenu;
