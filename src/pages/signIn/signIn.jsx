import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';

const SignIn = () => {

  let [user,setUser] = useState({});
  let [msg, setMsg] = useState(false);
  let navigate = useNavigate();

  function handleSignIn()
  {
     setMsg(false);
    fetch("http://localhost:4000/api/user/signin",{
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
     })
     .then((res) => {
        if(res.status === 400)
        {
          setMsg(true);
        }
        else if(res.status === 200)
        {
          localStorage.setItem("isLogged","true");
          navigate("/");
        }
     })
     .catch(e => console.log(e));
    }

  return (
    <div className='signin-container'>
         <div className="left-signin">
          <img src="https://img.freepik.com/premium-vector/crm-icons-customer-relationship-management-vector-infographics-template_116137-3703.jpg" alt="" />
         </div>
         <div className="right-signin">
         <h2><b>Sign In to you Account</b></h2>
         {
          msg &&
         <div class="alert alert-danger" role="alert">
   Invalid Credentials
        </div>
         }
         <label className='mb-2' htmlFor="email">Enter Email</label>
         <input type="email" className='form-control mb-3' name="email" onInput={e => setUser({...user,email: e.target.value})}/>
         <label className='mb-2' htmlFor="password">Enter password</label>
         <input type="password" className='form-control mb-3' name="password" onInput={e => setUser({...user,password: e.target.value})}/>
         <div className='btn-container'>
            <button className="btn btn-success mt-3" onClick={handleSignIn}>Sign In</button>
            </div>
            <hr />
        <p className='mt-3'>New to CRM? <Link to='/sign'>&nbsp;&nbsp;<span className='sign-upLink'>Sign Up</span></Link></p>
            </div>
    </div>
  );
}

export default SignIn;
