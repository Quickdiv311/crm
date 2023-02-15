import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css';

const SignUp = () => {

  let [user, setUser] = useState({});
  let navigate = useNavigate();

  function handleRegister()
  {
    fetch(process.env.REACT_APP_APIURL+"user/signup",{
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
     })
     .then((res) => console.log(res))
     .then(() => navigate("/login"));
  }

  return (
    <div className='signup-container'>
         <div className="left-signUp">
          <img src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg" alt="" />
         </div>
         <div className="right-signup">
         <h2><b>Please Register</b></h2>
         <label className='mb-2' htmlFor="username">Enter Username</label>
         <input type="text" className='form-control mb-3' name="username" value={user.username} onInput={e => setUser({...user,username: e.target.value})} />
         <label className='mb-2' htmlFor="email">Enter Email</label>
         <input type="email" className='form-control mb-3' name="email" value={user.email} onInput={e => setUser({...user,email: e.target.value})} />
         <label className='mb-2' htmlFor="password">Enter password</label>
         <input type="password" className='form-control mb-3' name="password" value={user.password} onInput={e => setUser({...user,password: e.target.value})}/>
         <div className='btn-container'>
            <button className="btn btn-success mt-3" onClick={handleRegister}>Register</button>
            </div>
            <hr />
            <p className='mt-3'>Already a User? <Link to='/login'>&nbsp;&nbsp;<span className='sign-inLink'>Sign In</span></Link></p>
            </div>
    </div>
  );
}

export default SignUp;
