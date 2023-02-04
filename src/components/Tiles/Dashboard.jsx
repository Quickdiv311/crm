import React from 'react';
import './Dashboard.css';

const Dashboard = (props) => {
  return (
<div className="tiles">
        <div className="tile"><h3>
        All Entries </h3> <h2>{props.count.total}</h2></div>
        <div className="row-blue tileN"> <h3>New</h3>  <h2>{props.count.new}</h2></div>
        <div className="row-green tileA"> <h3>Accepted</h3><h2>{props.count.accepted}</h2></div>
        <div className="row-red tileR"> <h3>Rejected</h3><h2>{props.count.rejected}</h2></div>
      </div>
  );
}

export default Dashboard;
