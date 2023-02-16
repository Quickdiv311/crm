import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from '../../shared/search/Search';
import Dashboard from '../../shared/Tiles/Dashboard';
import './Ticket.css';

const Ticket = () => {

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [count, setCount] = useState({});
  const titles = ["In Progress","New","Completed","Assigned","Total"];
  const order = [3,1,4,2,0];
  let navigate = useNavigate();

  useEffect(() => {
     fetch(process.env.REACT_APP_APIURL+"ticket")
     .then(res => res.json())
     .then(res => 
      {setTickets(res);
       setFilteredTickets(res);
        let newC = res.filter(r => r.status==="New").length;
        let CompeltedC = res.filter(r => r.status==="Completed").length;
        let AssignedC = res.filter(r => r.status==="Assigned").length;
        let inProgressC = res.filter(r => r.status==="In Progress").length;
        let totalC = res.length;
       let countO = {
        "blue": newC,
        "green": CompeltedC,
        "red": AssignedC,
        "yellow": inProgressC,
        "black": totalC
       }
       setCount(countO);
      });
  },[]);

  function color(value)
  {
    if(value === "Assigned")
    {
        return "row-red";
    }

    if(value === "In Progress")
    {
        return "row-yellow";
    }

    if(value === "New")
    {
        return "row-blue";
    }

    if(value === "Completed")
    {
        return "row-green";
    }
  }

  function handleEdit(desc)
  {
     navigate('/ticketForm/'+desc);
  }

  function handleSearch(value)
  {
     if(value)
     {
      let result = tickets.filter(t => t.desc.toLowerCase().includes(value.toLowerCase()));
      setFilteredTickets(result);
      setCount({yellow: filteredTickets.filter(c => c.status === "In Progress").length,blue: filteredTickets.filter(c => c.status === "New").length, green: filteredTickets.filter(c => c.status === "Completed").length,
      red: filteredTickets.filter(c => c.status === "Assigned").length, black: result.length});
     }
     else
     {
       setFilteredTickets(tickets);
       setCount({yellow: tickets.filter(c => c.status === "In Progress").length,blue: tickets.filter(c => c.status === "New").length, green: tickets.filter(c => c.status === "Completed").length,
      red: tickets.filter(c => c.status === "Assigned").length, black: tickets.length});
     }
  }

  function handleClick(value)
  {
    if(value == "Total")
    {
      setFilteredTickets(tickets);
    }
    else{
      let filtered = tickets.filter(ticket => ticket.status == value);
      setFilteredTickets([...filtered]);
    }
  }

  return (
   <div className="ticket-list">
    <h2>Tickets List</h2>
    <Dashboard order={order} titles={titles} count={count} handleClick={handleClick}/>
    <div className="ticketList-header">
    <button className="btn btn-primary mt-3 mb-3" onClick={() => navigate("/ticketForm")}>Create New Ticket</button>
    <Search handleInput={handleSearch}/>
    </div>
     <table className="table mt-3">
        <thead>
            <tr>
              <th></th>
                <th>Customer</th>
                <th>description</th>
                <th>status</th>
                <th>assignedTo</th>
                <th>raisedOn</th>
            </tr>
        </thead>
        <tbody>
            {
              filteredTickets.map((ticket) => (
                <tr className={color(ticket.status)}>
                  <td></td>
                    <td>{ticket.customer}</td>
                    <td>{ticket.desc}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.status!=="New" && ticket.assignedTo}</td>
                    <td>{ticket.raisedOn}</td>
                    <td style={{backgroundColor: "white"}}>
                    <div className="btn-group">
                        <button className="btn btn-success" onClick={() => handleEdit(ticket.desc)}><b>Edit</b></button>
                        <button className="btn btn-danger"><b>Delete</b></button>
                        </div>
                    </td>
                </tr>
              ))
            }
        </tbody>
     </table>
   </div>
  );
}

export default Ticket;
