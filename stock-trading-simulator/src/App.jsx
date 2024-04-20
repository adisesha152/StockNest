// App.js
import React, { useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate, Link } from 'react-router-dom';
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
import Portfolio from './Components/Portfolio';
import ChangeEmail from './Components/ChangeEmail';
import ChangePassword from './Components/ChangePassword';
import PhoneNumberLogin from './Components/PhoneNumberLogin';
import Crypto from './Components/Crypto';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Update isLoggedIn state to false when logout button is clicked
    return <Navigate to="/login" />;
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
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="emailchange" element={<ChangeEmail/>} />
        <Route path="/passwordchange" element={<ChangePassword/>} />
        <Route path="/signinphone" element={<PhoneNumberLogin/>} />

      </Routes>
    </BrowserRouter>
  );
}

// Navigation bar for authenticated users
function AuthenticatedNav({ setIsLoggedIn, handleLogout }) {
  return (
    <UserNav handleLogout={handleLogout} /> // Pass handleLogout to UserNav
  );
}

// Navigation bar for unauthenticated users
function UnauthenticatedNav() {
  return (
    <Nav />
  );
}

export default App;
