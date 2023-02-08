import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ticket.css';

const Ticket = () => {

  const [tickets, setTickets] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
     fetch("http://localhost:4000/api/ticket")
     .then(res => res.json())
     .then(res => setTickets(res));
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

  return (
   <div className="ticket-list">
    <h2>Tickets List</h2>
    <button className="btn btn-primary mt-3 mb-3" onClick={() => navigate("/ticketForm")}>Create New Ticket</button>
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
              tickets.map((ticket) => (
                <tr className={color(ticket.status)}>
                  <td></td>
                    <td>{ticket.customer}</td>
                    <td>{ticket.desc}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.status!="New" && ticket.assignedTo}</td>
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
