import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Register = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Error registering user:', error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed up with Google successfully:', result.user);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error('Error signing up with Google:', error.message);
    }
  };

  return (
    <div className='d-flex justify-content-center m-5'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container shadow rounded-5 m-5" style={{maxWidth: '90vh'}}>
      <div className="row justify-content-center">
        <div className='col-lg-6 col-md-8 col-sm-10 center'>
          <div className='d-flex flex-column justify-content-center align-items-center text-center m-4 p-2'>
            <h1 className=''>Register for your Trading Account</h1>
            <p className='text-secondary'>Sign Up to start trading without risk</p>
            {error && <p className='text-danger'>{error}</p>}
            <form className='form' onSubmit={handleSignUp}>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='form-control m-2' />
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='form-control m-2' />
              <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' className='form-control m-2' />
              <div className='d-grid'>
                <button type='submit' className='btn btn-dark rounded-5'>Sign Up</button>
                <button type='button' onClick={handleGoogleSignUp} className='btn btn-light rounded-5 mt-2'><i className='bi bi-google'></i> Sign Up with Google</button>
              </div>
            </form>
            <p className='text-secondary mt-2'>Already have an account? <Link to='/login' className='text-decoration-none text-secondary'>Click here</Link></p>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Register;
