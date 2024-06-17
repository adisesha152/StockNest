// App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from './Components/Nav';
import News from './Components/News';
import Stocks from './Components/Stocks';
import Register from './Components/Register';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import ForgotPass from './Components/ForgotPass';
import UserNav from './Components/UserNav'; // Import UserNav here
import Account from './Components/Account';
import ChangeEmail from './Components/ChangeEmail';
import ChangePassword from './Components/ChangePassword';
import Crypto from './Components/Crypto';
import Loader from './Components/Loader';
import UserStocks from './Components/UserStocks';
import Stock from './Components/Stock';
import Investments from './Components/Investments';
import Wallet from './Components/Wallet';
import Orders from './Components/Orders';
import Watchlist from './Components/Watchlist';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    return <Navigate to="/login" />;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
  }, 3000)
  return () => clearTimeout(timer);
  }, [])

  if(loading){
    return <Loader/>
  }

  function AuthenticatedNav({ setIsLoggedIn, handleLogout }) {
    return (
      <UserNav handleLogout={handleLogout} />
    );
  }
  
  function UnauthenticatedNav() {
    return (
      <Nav setIsLoggedIn={setIsLoggedIn} />
    );
  }

  return (
    <BrowserRouter>
      {isLoggedIn ? <AuthenticatedNav setIsLoggedIn={setIsLoggedIn} handleLogout={handleLogout} /> : <UnauthenticatedNav />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/news" element={<News />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="account" element={<Account/>} />
        <Route path="/investments" element={<Investments/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="emailchange" element={<ChangeEmail/>} />
        <Route path="/passwordchange" element={<ChangePassword/>} />
        <Route path="/stockss" element={<UserStocks/>} />
        <Route path="/stock" element={<Stock/>} />
        {/* <Route exact path="/" component={UserStocks} /> */}
        <Route path="/stock/:symbol" element={<Stock/>} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/watchlist" element={<Watchlist/>} />
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

// function AuthenticatedNav({ setIsLoggedIn, handleLogout }) {
//   return (
//     <UserNav handleLogout={handleLogout} />
//   );
// }

// function UnauthenticatedNav() {
//   return (
//     <Nav setIsLoggedIn={setIsLoggedIn} />
//   );
// }

export default App;
