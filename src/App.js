import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Customers from './pages/customers/Customers';
import SignIn from './pages/signIn/signIn';
import SignUp from './pages/signUp/signUp';
import Secure from './components/shared/secure/secure';
import Users from './pages/users/users';
import UserForm from './components/user-form/UserForm';
import Tickets from './pages/tickets/Tickets';
import CustomerForm from './components/customer/customer-form/CustomerForm';
import CreateTicket from './components/ticket/CreateTicket/CreateTicket';

function App() {

  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
       <Route path='/' element={
       <Secure>
       <Customers/>
       </Secure>}/>
       <Route path='/form' element={<Secure><CustomerForm/></Secure>}/>
       <Route path='/ticketForm' element={<Secure><CreateTicket/></Secure>}/>
       <Route path='/ticketForm/:desc' element={<Secure><CreateTicket/></Secure>}/>
       <Route path='/form/:customerName' element={<Secure><CustomerForm/></Secure>}/>
       <Route path='/sign' element={<SignUp/>}/>
       <Route path='/ticket' element={<Secure><Tickets/></Secure>}/>
       <Route path='/login' element={<SignIn/>}/>   
       <Route path='/users' element={<Secure><Users/></Secure>}/>
       <Route path='/userForm' element={<UserForm/>}/>         
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
