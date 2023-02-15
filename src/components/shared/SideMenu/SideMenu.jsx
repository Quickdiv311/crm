import React, { useState } from 'react';
import './SideMenu.css';
import {FaHome,FaUserAlt,FaBars,FaTicketAlt} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const SideMenu = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

    const menuItem = [
      {
        path: '/',
        name: 'Home',
        icon: <FaHome/>
      },
        
      {
        path: '/users',
        name: 'Users',
        icon: <FaUserAlt/>
      },

      {
        path: '/tickets',
        name: 'Tickets',
        icon: <FaTicketAlt/>
      }
    ]

  return (   
      <div className="container-fluid">
        <div className="sidebar" style={{width: isOpen ? '200px' : '50px', transition: 'ease-out 1s'}}>
          <div className="top-section">
          <div className="bars" onClick={() => setIsOpen(!isOpen)}><FaBars/></div>
          </div>
          <div className="menu-items">
          {
            menuItem.map((item, index) => (
              <NavLink to={item.path} key={index} className="link btn" activeclassname="active">
                <div className="icon">{item.icon}</div>
                <div style={{display: isOpen ? 'block' : 'none'}} className="link_text">{item.name}</div>
              </NavLink>
            ))
          }
          </div>
        </div>
        <main>{children}</main>
      </div>
  );
}

export default SideMenu;
