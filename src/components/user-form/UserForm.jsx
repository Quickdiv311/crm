import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './UserForm.css';

const UserForm = () => {

 const [user, setUser] = useState({});
 let navigate = useNavigate();
 
 function handleSubmit()
 {
    fetch("http://localhost:4000/api/user/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => navigate("/users"))
 }

  return (
    <div>
      <Header/>
    <div className='userform-container'>
       <h2 className='mb-3'>User Form</h2>
      <label htmlFor="name" className='mb-2 mt-3'>Name</label>
      <input type="text" name="name" className='form-control mb-3' onInput={(e) => setUser({...user,name: e.target.value})}/>
      <label htmlFor="username" className='mb-2'>Username</label>
      <input type="text" name="username" className='form-control mb-3' onInput={(e) => setUser({...user,username: e.target.value})}/>
      <label htmlFor="email" className='mb-2'>Email</label>
      <input type="email" name="email" className='form-control mb-3' onInput={(e) => setUser({...user,email: e.target.value})}/>
      <label htmlFor="password" className='mb-2'>Password</label>
      <input type="password" name="password" className='form-control mb-3' onInput={(e) => setUser({...user,password: e.target.value})}/>
      <input type="checkbox" onChange={(e) => setUser({...user,isActive: e.target.checked})}/>&nbsp;
      <label>is Active</label>
      <div className="btn-container">
        <button className="btn btn-success" onClick={handleSubmit}>Add user to list</button>
      </div>
    </div>
    </div>
  );
}

export default UserForm;
