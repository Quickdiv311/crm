import CustomerList from '../../components/customer-list/CustomerList';
import Header from '../../components/Header/Header';
import './customers.css';


function Customers(){

   

  return (
    <div className="customers-page">
      <Header/>
      <CustomerList/>
    </div>
  );
}

export default Customers;
