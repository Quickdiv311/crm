import React from 'react';
import './Dashboard.css';

const Dashboard = (props) => {
  return (
<div className="tiles">
        <div className="row-yellow" style={{order: props.order[0]}}><h3>{props.titles[0]} </h3> <h2>{props.count.yellow}</h2></div>
        <div className="row-blue" style={{order: props.order[1]}}><h3>{props.titles[1]}</h3>  <h2>{props.count.blue}</h2></div>
        <div className="row-green" style={{order: props.order[2]}}><h3>{props.titles[2]}</h3><h2>{props.count.green}</h2></div>
        <div className="row-red" style={{order: props.order[3]}}><h3>{props.titles[3]}</h3><h2>{props.count.red}</h2></div>
        {
          props.order.length>4 && <div className="row-black" style={{order: props.order[4]}}><h3>{props.titles[4]}</h3><h2>{props.count.black}</h2></div>
        }
</div>
  );
}

export default Dashboard;
