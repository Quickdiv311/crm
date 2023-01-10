import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './CustomerForm.css';

const CustomerForm = () => {

  const [years, setYears] = useState([]);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  let yearArray = [];

  useEffect(() => {

    for(let i=2022;i>=1908;i--)
    {
        yearArray.push(i);
    }
    setYears(yearArray);
  },[]);
  
  function handleSubmit()
  {
    console.log(customer);
    fetch("http://localhost:4000/api/customer",{
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(()  => navigate('/'));
  }

  return (
    <div className="new-customer">
      <Header/>
    <div className='customer-form'>
      <h3>Add a new customer</h3>
      <input type="text" className='form-control mb-3' onChange={e => {
        customer.name=e.target.value;
        setCustomer(customer);
      }} placeholder='Company Name'/>
      <input type="text" className='form-control mb-3' onChange={e => {
        customer.website=e.target.value;
        setCustomer(customer);
      }} placeholder='Website'/>
      <div className="row">
      <div className="mb-3 col-6">
      <input type="number" className='form-control' onChange={e => {
        customer.turnover=e.target.value;
        setCustomer(customer);
      }} placeholder='Revenue'/>
      </div>
      <div className="mb-3 col-6">
      <input type="number" className='form-control' onChange={e => {
        customer.employees=e.target.value;
        setCustomer(customer);
      }} placeholder='Number of Employees'/>
      </div>
      </div>
      <div className="row">
      <div className="mb-3 col-6">
      <input type="text" className='form-control' onChange={e => {
        customer.ceo=e.target.value;
        setCustomer(customer);
      }} placeholder='CEO'/>
      </div>
      <div className="mb-3 col-3">
      <select className="form-select" aria-label=".form-select-sm example" onChange={e => {customer.year = e.target.value; setCustomer(customer);}}>
  <option value="" selected hidden>Established Year</option>
  {
    years.map((year) => (
<option value={year} className="select-option">{year}</option>
    ))
  }
  
</select>
      </div>
      </div>
      <div className="btn-container mb-3">
        <button className="btn btn-primary float-end" onClick={handleSubmit}>Add customer to List</button>
      </div>
    </div>
    </div>
  );
}

export default CustomerForm;
