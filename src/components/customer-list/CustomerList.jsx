import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
       fetch("http://localhost:4000/api/customer")
       .then(res => res.json())
       .then(res =>
        setCustomers(res));
    },[]);

  return (
    <div className='customer-list'>
      <h1 className='mb-3'>Customer List</h1>
      <div>
        <Link className="btn btn-primary mb-3" to="/add">Add new Customer</Link>
      </div>
      {
        customers.length >0 ? 
         <table className='table table-light mt-3'>
      <thead>
            <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Reveue</th>
                <th>NumberOfEmployees</th>
                <th>CEO</th>
                <th>Established Year</th>
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
