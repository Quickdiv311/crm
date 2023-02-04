import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paginator from '../paginator/paginator';
import Dashboard from '../Tiles/Dashboard';
import './CustomerList.css';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setfilteredCustomers] = useState([]);
    const [count, setCount] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
       fetch("http://localhost:4000/api/customer")
       .then(res => res.json())
       .then(res =>
        {
          setCustomers(res);
          setfilteredCustomers(res);
          let newCount = res.filter(c => c.status === "New").length;
          let acceptedCount = res.filter(c => c.status === "Accepted").length;
          let rejectedCount = res.filter(c => c.status === "Rejected").length;
          let countObj = {
            "new": newCount,
            "accepted": acceptedCount,
            "rejected": rejectedCount,
            "total": res.length
          }
          setCount(countObj);
        }
        );
    },[]);

    function handleEdit(name)
    {
      navigate('/form/'+name);
    }

    function handleDelete(name)
    {
      fetch("http://localhost:4000/api/customer/"+name,{
        method: "DELETE",
        body: JSON.stringify(customers),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => setCustomers(res))
    }

    function handleColor(status)
    {
      if(status === "New")
      {
        return "row-blue";
      }
      
      if(status === "Accepted")
      {
        return "row-green";
      }

      if(status === "Rejected")
      {
        return "row-red";
      }
    }

    function handleInput(val)
    {
        if(val)
        {
          let filteredCustomers =  customers.filter(customer => customer.name.toLowerCase().includes(val.toLowerCase()));
          setfilteredCustomers([...filteredCustomers]);
          setCount({total: filteredCustomers.length,new: filteredCustomers.filter(c => c.status === "New").length, accepted: filteredCustomers.filter(c => c.status === "Accepted").length,
          rejected: filteredCustomers.filter(c => c.status === "Rejected").length});
        }
        else
        {
          setfilteredCustomers(customers);
          setCount({total: customers.length,new: customers.filter(c => c.status === "New").length, accepted: customers.filter(c => c.status === "Accepted").length,
          rejected: customers.filter(c => c.status === "Rejected").length});
        }
    }

  return (
    <div className='customer-list'>
      <h1 className='mb-3'>Customer List</h1>
      <Dashboard count = {count}/>
      <div className='btn-search'>
        <Link className="btn btn-primary mb-3 mt-3" to="/form">Add new Customer</Link>
        <div className="search-container">
          <input type="search" onInput={e => handleInput(e.target.value)} placeholder="Search"/>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search search-icon" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
        </div>
      </div>
      {
        filteredCustomers.length >0 ? 
         <table className='table mt-3'>
      <thead>
            <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Reveue</th>
                <th>Status</th>
                <th>NumberOfEmployees</th>
                <th>CEO</th>
                <th>Established Year</th>

            </tr>
        </thead>
                <tbody>
                {
                    filteredCustomers.map((customer) =>  
                        (<tr className={handleColor(customer.status)} style={{border: "none"}}>
                        <td>{customer.name}</td>
                        <td>{customer.website}</td>
                        <td>{customer.turnover.toString()}</td>
                        <td>{customer.status}</td>
                        <td>{customer.employees.toString()}</td>
                        <td>{customer.ceo}</td>
                        <td>{customer.year.toString()}</td>
                        <td style={{backgroundColor: "white"}}>
                        <div className="btn-group">
                        <button className="btn btn-success" onClick={() => handleEdit(customer.name)}><b>Edit</b></button>
                        <button className="btn btn-danger" onClick={() => handleDelete(customer.name)}><b>Delete</b></button>
                        </div>
                        </td>
                        </tr>)
                    )
                }
                
                </tbody>
                </table>
                :
                <div className='alert alert-primary mt-3' role="alert"><b>There is no Customer data to display</b></div>
}
<Paginator/>
    </div>
  );
}

export default CustomerList;
