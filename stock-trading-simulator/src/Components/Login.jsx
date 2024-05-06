import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await axios.post('http://localhost:3000/auth/login', { email, password });
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setRedirectToDashboard(true);
      console.log('User signed in successfully');
    } catch (error) {
      setError('Incorrect email or password. Please try again.');
      console.error('Error signing in:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      // await axios.post('http://localhost:3000/auth/login', { email, password });
      if (user) {
        setIsLoggedIn(true);
        setRedirectToDashboard(true);
        console.log('User signed in with Google successfully');
      } else {
        setError('User not found. Please register an account first.');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please register an account first.');
      } else {
        console.error('Error signing in with Google:', error.message);
      }
    }
  };
  
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='d-flex justify-content-center m-5'
    >
      <div className='container shadow m-5 rounded-5' style={{maxWidth: '90vh'}}>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 center'>
            <div className='d-flex flex-column justify-content-center align-items-center text-center m-4 p-2'>
              <h1 className=''>Login to your Trading Account</h1>
              <p className='text-secondary'>Sign in to start trading without risk</p>
              {error && <p className='text-danger'>{error}</p>}
              <form className='form' onSubmit={handleSignIn}>
                <input type='email' name='email' value={email} placeholder='Email' className='form-control m-2' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' name='password' value={password} placeholder='Password' className='form-control m-2' onChange={(e) => setPassword(e.target.value)} />
                <div className='d-grid mt-3' >
                  <button type='submit' className='btn btn-dark rounded-5' >Sign In</button>
                  <button onClick={handleGoogleSignIn} className='btn btn-light rounded-5 mt-2'><i className='bi bi-google'></i> Sign In with Google</button>
                </div>
              </form>
              <p className='text-secondary mt-2'><Link to='/forgotpass' className='text-decoration-none text-secondary'>Forgot password?</Link></p>
              <p className='text-secondary mt-'>Doesn't have an account? <Link to='/register' className='text-decoration-none text-secondary'>Click here</Link></p>
            </div>
          </div>
        </div>
      </div>
      {redirectToDashboard && <Navigate to="/dashboard" />}
    </motion.div>
  );
};

export default Login;