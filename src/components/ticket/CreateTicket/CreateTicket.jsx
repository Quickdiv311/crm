import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import './CreateTicket.css';

const CreateTicket = () => {

 const [ticket, setTicket] = useState({});
 const [errMsg, setErrMsg]  = useState(false);
 const [customers, setCustomers] = useState([]);
 const [users,setUsers] = useState([]);
 let {desc} = useParams();
 let navigate = useNavigate();


 function handleSubmit()
 {
    setErrMsg(false);
    if(!ticket.status)
    {
       setErrMsg(true);
    }
    else
    {
      fetch("http://localhost:4000/api/ticket",
      {
          method: "POST",
          body: JSON.stringify(ticket),
          headers: {
              "Content-Type": "application/json"
            }
      })
      .then(() => navigate("/ticket"));
    }
 }

 function handleEdit()
 {
  fetch("http://localhost:4000/api/ticket",
      {
          method: "PUT",
          body: JSON.stringify(ticket),
          headers: {
              "Content-Type": "application/json"
            }
      })
      .then(() => navigate("/ticket"));
 }

 useEffect(() => {
  fetch("http://localhost:4000/api/customer")
  .then(res => res.json())
  .then(res => setCustomers(res));

  fetch("http://localhost:4000/api/user")
  .then(res => res.json())
  .then(res => setUsers(res));

  if(desc)
  {
    fetch("http://localhost:4000/api/ticket")
  .then(res => res.json())
  .then(res => {
    let r = res.find(i => i.desc === desc);

    if(r)
    {
      setTicket(r);
    }
    console.log(r);
  })  
}
 },[]);

  return (
    <div>
        <Header/>
        <div className="create-ticket">
            <h3>
                Create a new Ticket
            </h3>
            
            {
              errMsg && 
              <div className="alert alert-danger mt-3 mb-3" role="alert">
               Please select a status
            </div>
            }
            
                   <label className="form-label mt-3" htmlFor="name">Customer Name</label>
                    <select disabled={desc} name="name" className='form-select mb-3' value={ticket.customer} onInput={e => {setTicket({...ticket, customer:e.target.value})}}>
                      {
                        !desc ?
                    <option value="" selected hidden>Select  a  Customer:</option>
                    :
                    <option value={ticket.customer} selected>{ticket.customer}</option>
                      }
                    {
                      customers.map((customer) => (
                        <option value={customer.name}>{customer.name}</option>
                      ))
                    }
                    </select>

            <label className="form-label" htmlFor="description">Description</label>
            <input value={ticket.desc} onInput={e => setTicket({...ticket, desc:e.target.value})} type="text" className='form-control mb-3' name="description"/>

            <div className="row mb-3">
                <div className="col-4">
                    <label className="form-label" htmlFor="status">Status</label>
                    <select name="status" className='form-select' value={ticket.status} onInput={e => {
                      setErrMsg(false);
                      setTicket({...ticket, status:e.target.value})
                      }}>
                    <option value="" selected hidden>Select:</option>
                    <option value="New">New</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    </select>
                </div>

              {
                ticket.status && ticket.status!=="New" &&  <div className="col-8">
                <label className="form-label" htmlFor="assigned">Assigned To</label>
                <select name="name" className='form-select' value={ticket.assignedTo} onInput={e => {setTicket({...ticket, assignedTo:e.target.value})}}>
                {
                        !desc ?
                    <option value="" selected hidden>Select  a  User:</option>
                    :
                    <option value={ticket.assignedTo} selected>{ticket.assignedTo}</option>
                      }
                    {
                      users.map((user) => (
                        <option value={user.name}>{user.name}</option>
                      ))
                    }
                    </select>
            </div>
              }
               
            </div>

            <div className="row mb-3">
                <div className="col-3">
            <label className="form-label" htmlFor="date">Raised on</label>
            <br />
            <input value={ticket.raisedOn} onInput={e => setTicket({...ticket, raisedOn:e.target.value})} type="date" className='form-control'/>
            </div>
               <div className="col-6">
                
               </div>
            </div>
            {
              desc ? 
              <button className="btn btn-success float-end" onClick={handleEdit}>Save Ticket</button>
              :
              <button className="btn btn-primary float-end" onClick={handleSubmit}>Raise Ticket</button>
            }
        </div>
    </div>
  );
}

export default CreateTicket;
