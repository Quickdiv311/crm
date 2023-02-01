import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
       fetch("http://localhost:4000/api/customer")
       .then(res => res.json())
       .then(res =>
        setCustomers(res));
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

  return (
    <div className='customer-list'>
      <h1 className='mb-3'>Customer List</h1>
      <div>
        <Link className="btn btn-primary mb-3 mt-3" to="/form">Add new Customer</Link>
      </div>
      {
        customers.length >0 ? 
         <table className='table mt-3'>
      <thead>
            <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Reveue</th>
                <th>NumberOfEmployees</th>
                <th>CEO</th>
                <th>Established Year</th>
                <th></th>
            </tr>
        </thead>
                <tbody>
                {
                    customers.map((customer) => (
                <tr>
                <td>{customer.name}</td>
                <td>{customer.website}</td>
                <td>{customer.turnover.toString()}</td>
                <td>{customer.employees.toString()}</td>
                <td>{customer.ceo}</td>
                <td>{customer.year.toString()}</td>
                <td>
                <div className="btn-group">
                <button className="btn btn-success" onClick={() => handleEdit(customer.name)}><b>Edit</b></button>
                <button className="btn btn-danger" onClick={() => handleDelete(customer.name)}><b>Delete</b></button>
                </div>
                </td>
                </tr>
                    ))
                }
                
                </tbody>
                </table>
                :
                <div className='alert alert-primary mt-3' role="alert"><b>There is no Customer data to display</b></div>
}
    </div>
  );
}

export default CustomerList;
