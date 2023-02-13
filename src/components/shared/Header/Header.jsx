import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {

  const [logged,setLogged] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let value = localStorage.getItem("isLogged");
    
    if(value && value==="true")
    {
      setLogged(true);
    }
    else
    {
      setLogged(false);
    }
  },[]);

  function onSignOut()
  {
      localStorage.removeItem("isLogged");
      setLogged(false);
      navigate("/login");
  }

  return (
    <div className='main-header'>
       <span className='topic'><h4><Link to="/">CRM</Link></h4>
       <h4 className='users-topic'><Link to="/users">Users</Link></h4>
       <h4 className='users-topic'><Link to="/ticket">Tickets</Link></h4>
      
       </span>
    { 
     logged &&
      (
      <div className="right-header">
        <span className='header-topic'><button onClick={onSignOut} className='btn btn-success'>Sign Out</button></span>
      </div>
      )
       }
      {
        !logged && (
       <div className="right-header">
          <span className='header-topic'><Link to="/sign" className='btn btn-primary'>Sign Up</Link></span>
          <span className='header-topic'><Link to="/login" className='btn btn-success'>Sign In</Link></span>
       </div>
    )}
    </div>
  );
}

export default Header;
