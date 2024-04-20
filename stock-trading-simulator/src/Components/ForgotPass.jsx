import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPass = () => {
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setResetStatus('success');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      setResetStatus('error'); 
    }
  };

  return (
    <div className='d-flex justify-content-center m-5'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='container shadow m-5 rounded-5' style={{maxWidth: '90vh'}}>
      <div className='row justify-content-center'>
        <div className='col-lg-6 col-md-8 col-sm-10 center'>
          <div className='d-flex flex-column justify-content-center align-items-center text-center m-4 p-2'>
            <h1 className=''>Forgot Password</h1>
            <p className='text-secondary'>Enter your email to reset your password</p>
            <form className='form' onSubmit={handleResetPassword}>
              <input type='email' name='email' placeholder='Email' className='form-control m-2' />
              <div className='d-grid mt-3'>
                <button type='submit' className='btn btn-dark rounded-5'>Reset Password</button>
              </div>
            </form>
            {resetStatus === 'success' && (
              <div>
                <p className='text-success mt-2'>Password reset email sent successfully. Please check your email.</p>
                {/* <p className='text-secondary'><Link to='/login' className='text-decoration-none text-secondary'>Click here</Link> to log in.</p> */}
              </div>
            )}
            {resetStatus === 'error' && (
              <p className='text-danger mt-2'>Error sending password reset email. Please try again later.</p>
            )}
            <p className='text-secondary mt-2'><Link to='/login' className='text-decoration-none text-secondary'>Go back to Login</Link></p>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default ForgotPass;
