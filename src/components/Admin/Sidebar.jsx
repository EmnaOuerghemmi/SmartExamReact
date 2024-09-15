import React, { useState } from 'react';
import './Sidebar.css'; 
import logoImage from '../../assets/images/rijXG1C__400x400-removebg-preview (1).png';
import navConfig from '../../Nav';

const Sidebar = () => {
  const [openGroup, setOpenGroup] = useState(null);

  const handleToggle = (name) => {
    setOpenGroup(openGroup === name ? null : name);
  };

  const renderNavItems = (items) =>
    items.map((item, index) => {
      if (item.items) { // Vérifie si l'élément a des sous-éléments
        const isOpen = openGroup === item.name;
        return (
          <li key={index} className="nav-group">
            <button
              className="nav-group-toggle"
              onClick={() => handleToggle(item.name)}
            >
              <span>{item.name}</span>
            </button>
            {isOpen && (
              <ul className="nav-group-items">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a href={subItem.to}>
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      }
      return (
        <li key={index}>
          <a href={item.to}>
            {item.name}
          </a>
        </li>
      );
    });

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logoImage} alt="Logo" className="logo-img" />
      </div>
      <nav className="nav">
        <ul>
          {renderNavItems(navConfig)}
        </ul>
      </nav>
     
    </aside>
  );
}

export default Sidebar;
