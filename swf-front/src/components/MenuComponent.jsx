import React,  { useState } from 'react';
import menuIcon from '../images/charm_menu-hamburger.svg';


function Menu(props) {
    const { menuItems } = props;
    const [showMenu, setShowMenu] = useState(false);

    const handleMenuClick = () => {
        setShowMenu(!showMenu);
      };
  
      return (
        <div className="menu">
          <button><img
            src={menuIcon}
            alt="Menu"
            onClick={handleMenuClick}
          />
          {showMenu && (
            <ul className="menu-items">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button>{item}</button>
                </li>
              ))}
            </ul>
          )}
          </button>
        </div>
      );
    }
  
  export default Menu;