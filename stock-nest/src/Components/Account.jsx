import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail, updateEmail, sendEmailVerification } from 'firebase/auth';
import ChangeEmail from './ChangeEmail';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Account = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [emailChangeError, setEmailChangeError] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        setPasswordResetSent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleChangeEmail = () => {
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        setEmailChangeSuccess(true);
      })
      .catch(error => {
        setEmailChangeError(error.message);
      });
  };

  const handleResendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setEmailVerificationSent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!user) {
    return <div><h1 className='text-secondary text-center m-5'>Loading...</h1></div>;
  }

  return (
    // <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    //   transition={{ duration: 0.5 }}
    // >
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-5 m-4 p-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Account Settings</h2>
              <div className="form-group">
                <label className="mb-1">Current Email:</label>
                <p className="form-control">{user.email}</p>
              </div>
              {user.emailVerified ? (
                <p className="text-success">Email Verified</p>
              ) : (
                <>
                  <button className="btn btn-dark btn-block m-1" onClick={handleResendVerificationEmail}>
                    Send Verification Email
                  </button>
                  {emailVerificationSent && (
                    <p className="text-success mt-2">Verification email sent! Please check your inbox.</p>
                  )}
                </>
              )}
              <div className="form-group">
                {/* <button className="btn btn-dark btn-block m-1" onClick={handlePasswordReset}>
                  Reset Password
                </button>
                {passwordResetSent && <p className="text-success mt-2">Password reset email sent!</p>} */}
              <button className='btn btn-dark m-1'><Link to='/emailchange' className='text-decoration-none text-white'>Change Email</Link></button>
              <button className='btn btn-dark m-1'><Link to='/passwordchange' className='text-decoration-none text-white'>Change Password</Link></button>
              </div>
              {/* <hr /> */}
              {/* <div className="form-group">
                <label className="mb-1">Change Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
                <button className="btn btn-dark btn-block mt-3" onClick={handleChangeEmail}>
                  Change Email
                </button>
                {emailChangeSuccess && <p className="text-success mt-2">Email changed successfully!</p>}
                {emailChangeError && <p className="text-danger mt-2">{emailChangeError}</p>}
                {/* <ChangeEmail/> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    // </motion.div>
  );
};

export default Account;
