import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paginator from '../../paginator/paginator';
import Search from '../../search/Search';
import Dashboard from '../../Tiles/Dashboard';
import './CustomerList.css';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    const [searchInput, setSearchInput] = useState();
    const [filteredCustomers, setfilteredCustomers] = useState([]);
    const [count, setCount] = useState({});
    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(1);
    const navigate = useNavigate();
    const [total, setTotal] = useState();

    useEffect(() => {
      setCurrent(1);
       load(1);
    },[]);

    function load(pageNo)
    {
      fetch("http://localhost:4000/api/customer/page/"+pageNo)
       .then(res => res.json())
       .then(res =>
        {
          setCustomers(res.records);
          setfilteredCustomers(res.records);
          let newCount = res.records.filter(c => c.status === "New").length;
          let acceptedCount = res.records.filter(c => c.status === "Accepted").length;
          let rejectedCount = res.records.filter(c => c.status === "Rejected").length;
          let countObj = {
            "new": newCount,
            "accepted": acceptedCount,
            "rejected": rejectedCount,
            "total": res.records.length
          }
          setCount(countObj);

          let totalPage = Math.ceil(res.totalCount/100);
          setTotal(totalPage);
          let pageArray = new Array(totalPage).fill(0);
          setPages(pageArray);
        }
        );
    }

    function handleEdit(name)
    {
      navigate('/form/'+name);
    }

    function handleDelete(name)
    {
      fetch("http://localhost:4000/api/customer/"+name,{
        method: "DELETE",
      })
      .then(res => res.json())
      .then(res => {setCustomers(res);setfilteredCustomers(res)});
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
        setSearchInput(val);
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
         <Search searchInput={searchInput} handleInput={handleInput}/>
      </div>
      {
        filteredCustomers.length >0 ? 
         <table className='table mt-3'>
      <thead>
            <tr>
              <th></th>
                <th>Name</th>
                <th>Reveue</th>
                <th>Status</th>
                <th>Employees</th>
                <th>CEO</th>
                <th>Established Year</th>

            </tr>
        </thead>
                <tbody>
                {
                    filteredCustomers.map((customer) =>  
                        (<tr className={handleColor(customer.status)} style={{border: "none"}}>
                          <td></td>
                        <td>{customer.name}</td>
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
    <div className='pagin'>
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      {
         current > 1 &&
         <button className="page-link" onClick={() => { load(current-1);setCurrent(current-1);}} aria-label="Previous">
         <span aria-hidden="true">&laquo;</span>
       </button>
      }

    </li>
    {
      pages.map((p,i) => (
       <li className="page-item"><button className="page-link" onClick={() => {load(i+1); setCurrent(i+1);}}>{i+1}</button></li> 
      ))
    }
    <li className="page-item">
      {
        current < total && 
        <button className="page-link" onClick={() => {load(current+1);setCurrent(current+1); }} aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </button>
      }
    </li>
  </ul>
</nav>
    </div>
    </div>
  );
}

export default CustomerList;
