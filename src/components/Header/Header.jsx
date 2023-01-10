import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='main-header'>
       <span className='topic'><h3>CRM</h3></span>
       <div className="right-header">
          <span className='header-topic'><Link to="/">Customer List</Link></span>
       </div>
    </div>
  );
}

export default Header;
