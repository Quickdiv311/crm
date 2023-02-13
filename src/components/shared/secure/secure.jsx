import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Secure = (props) => {

   let [logged, setLogged] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
     let islogged = localStorage.getItem("isLogged");

     if(!islogged || islogged!=="true")
     {
        navigate("/login");
     }
     else
     {
        setLogged(true);
     }
   },[]);
    

  return (
   <React.Fragment>
       {
         logged ? props.children : null
       }
   </React.Fragment>
  );
}

export default Secure;
