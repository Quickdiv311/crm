import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerForm from './components/customer-form/CustomerForm';
import Customers from './pages/customers/Customers';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
     <Routes>
       <Route path='/' element={<Customers/>}/>
       <Route path='/add' element={<CustomerForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
