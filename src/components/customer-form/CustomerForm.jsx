import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './CustomerForm.css';

const CustomerForm = () => {

  const [years, setYears] = useState([]);
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();
  let {customerName} = useParams();
  let yearArray = [];

  useEffect(() => {

    if(customerName)
    {
      fetch("http://localhost:4000/api/customer")
      .then(res => res.json())
      .then((res) => {
       let result = res.find(c => c.name === customerName);
  
       if(result)
       {
         setCustomer(result);
       }
      })
    }  

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

  function handleEdit()
  {
    fetch("http://localhost:4000/api/customer",{
      method: "PUT",
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
      <input type="text" className='form-control mb-3' value={customer.name} onInput={e => {
        let obj = {...customer};
        obj.name = e.target.value;
        setCustomer(obj);
      }} placeholder='Company Name'/>

      <input type="text" className='form-control mb-3' value={customer.website} onInput={e => {
         let obj = {...customer};
         obj.website = e.target.value;
         setCustomer(obj);

      }} placeholder='Website'/>
      <div className="row">
      <div className="mb-3 col-6">
      <input type="number" className='form-control' value={customer.turnover} onInput={e => {
        let obj = {...customer};
        obj.turnover = e.target.value;
        setCustomer(obj);

      }} placeholder='Revenue'/>
      </div>
      <div className="mb-3 col-6">
      <input type="number" className='form-control' value={customer.employees} onInput={e => {
        let obj = {...customer};
        obj.employees = e.target.value;
        setCustomer(obj);

      }} placeholder='Number of Employees'/>
      </div>
      </div>
      <div className="row">
      <div className="mb-3 col-6">
      <input type="text" className='form-control' value={customer.ceo} onInput={e => {
        let obj = {...customer};
        obj.ceo = e.target.value;
        setCustomer(obj);

      }} placeholder='CEO'/>
      </div>
      <div className="mb-3 col-2">
      <select className="form-select" aria-label=".form-select-sm example" value={customer.year} onInput={e => {
         let obj = {...customer};
         obj.year = e.target.value;
         setCustomer(obj);
         }}>
  <option value="" selected hidden>Estd. In</option>
  {
    years.map((year) => (
<option value={year} className="select-option">{year}</option>
    ))
  }
  
</select>
      </div>
      </div>
      <div className="btn-container mb-3">
        {
          customerName ? 
          <button className="btn btn-success float-end" onClick={handleEdit}>Save Change</button>:
          <button className="btn btn-primary float-end" onClick={handleSubmit}>Add customer to List</button>
        }
      </div>
    </div>
    </div>
  );
}

export default CustomerForm;
