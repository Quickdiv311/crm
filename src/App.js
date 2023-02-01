import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerForm from './components/customer-form/CustomerForm';
import Customers from './pages/customers/Customers';
import SignIn from './pages/signIn/signIn';
import SignUp from './pages/signUp/signUp';
import Secure from './components/secure/secure';
import Users from './pages/users/users';
import UserForm from './components/user-form/UserForm';

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
       <Route path='/form/:customerName' element={<Secure><CustomerForm/></Secure>}/>
       <Route path='/sign' element={<SignUp/>}/>
       <Route path='/login' element={<SignIn/>}/>   
       <Route path='/users' element={<Users/>}/>
       <Route path='/userForm' element={<UserForm/>}/>         
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
