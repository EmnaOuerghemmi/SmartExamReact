import React, { useState } from 'react';
import './Sidebar.css'; 
import logoImage from '../../assets/images/rijXG1C__400x400-removebg-preview (1).png';
import navConfig from '../../Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUserGraduate, faChalkboardTeacher, faDoorClosed, faSignOutAlt, faClipboardList, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const [openGroup, setOpenGroup] = useState(null);

  const handleToggle = (name) => {
    setOpenGroup(openGroup === name ? null : name);
  };

  const iconMapping = {
    Dashboard: faTachometerAlt,
    Etudiants: faUserGraduate,
    Classes: faChalkboardTeacher,
    Salle: faDoorClosed,
    "Affectation examens": faClipboardList,
    Notes: faExclamationTriangle,
    Déconnexion: faSignOutAlt
  };

  const renderNavItems = (items) =>
    items.map((item, index) => {
      const Icon = iconMapping[item.name]; // Associer une icône au nom

      if (item.items) { // Si l'élément a des sous-éléments
        const isOpen = openGroup === item.name;
        return (
          <li key={index} className="nav-group">
            <button
              className="nav-group-toggle"
              onClick={() => handleToggle(item.name)}
            >
              {Icon && <FontAwesomeIcon icon={Icon} className="nav-icon" />} 
              <span>{item.name}</span>
            </button>
            {isOpen && (
              <ul className="nav-group-items">
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a href={subItem.to}>
                      <span>{subItem.name}</span>
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
            {Icon && <FontAwesomeIcon icon={Icon} className="nav-icon" />} 
            <span>{item.name}</span>
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
