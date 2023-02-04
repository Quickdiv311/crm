import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './users.css';

const Users = () => {

  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
     fetch("http://localhost:4000/api/user")
     .then((res) => res.json())
     .then((res) => setUsers(res));
  },[])

  function handleActive(username)
  {
    fetch("http://localhost:4000/api/user/activate/"+username,{
      method: "PUT",
    })
    .then((res) => res.json())
    .then((res) => setUsers(res));
  }

  function handleDeactive(username)
  {
    fetch("http://localhost:4000/api/user/deActivate/"+username,{
      method: "PUT",
    })
    .then((res) => res.json())
    .then((res) => setUsers(res));
  }


  return (
    <div>
        <Header/>
    <div className='users-container'>
    <h1 className='mb-3'>User List</h1>
    <button className="btn btn-primary mb-3 mt-3" onClick={() => {navigate("/userForm")}}>Add New User</button>
      <table className='table mt-3'>
            <thead>
                <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (
                      <tr>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                      {user.isActive ? 
                      <button className="btn btn-danger btn-users" onClick={() => handleDeactive(user.username)}>Deactivate</button> : 
                      <button className="btn btn-success btn-users" onClick={() => handleActive(user.username)}>Activate</button>}
                      </td>
                      </tr>
                    ))
                }
            </tbody>
      </table>
    </div>
    </div>
  );
}

export default Users;
