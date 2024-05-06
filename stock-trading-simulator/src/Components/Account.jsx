import React, { useState, useEffect } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Account = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);
  const [addAmountValue, setAddAmountValue] = useState('');
  const [addedBalanceMessage, setAddedBalanceMessage] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (user) {
          const response = await axios.get('http://localhost:3000/auth/balance', {
            params: {
              email: user.email
            }
          });
          setWalletBalance(response.data.balance);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [user]);

  if (walletBalance === null) {
    return <div><h1 className='text-secondary text-center m-5'>Loading...</h1></div>;
  }

  const handleResendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setEmailVerificationSent(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addAmount = async () => {
    if (!addAmountValue) {
      alert('Please enter a valid amount.');
      return;
    }

    const amount = parseInt(addAmountValue);

    try {
      const response = await axios.post('http://localhost:3000/auth/add', {
        email: user.email,
        amount
      });

      if (response.status === 200) {
        const data = response.data;
        console.log('Balance added:', data);
        setWalletBalance(prevBalance => prevBalance + amount);
        setAddAmountValue('');
        setAddedBalanceMessage(`₹${amount} added to your wallet balance.`);
      } else {
        console.error('Failed to add balance:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding balance:', error);
    }
  };

  if (!user) {
    return <div><h1 className='text-secondary text-center m-5'>Loading...</h1></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container my-5"
    >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-5 m-4 p-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Wallet</h2>
              <p className='fs-5'><b>Balance: </b>${walletBalance}</p>
              <div className="form-group">
                <label className="mb-1">Add Balance:</label>
                <input
                  type='number'
                  className='form-control'
                  value={addAmountValue}
                  onChange={(e) => setAddAmountValue(e.target.value)}
                />
              </div>
              {addedBalanceMessage && (
                <p className="text-success">{addedBalanceMessage}</p>
              )}
              <div className="form-group" style={{marginTop: '15px'}}>
                <button
                  className='btn btn-dark m-1'
                  onClick={addAmount}
                  disabled={!addAmountValue}
                >
                  Add Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg rounded-5 m-4 p-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Account Settings</h2>
              <div className="form-group">
                <br></br>
                <label className="mb-1">Name:</label>
                <img src={user.photoURL} alt="User" className='rounded-5 d-flex justify-content-center fs- form-contro' />
                <p className="form-control">{user.displayName}</p>
                <label className="mb-1">Current Email:</label>
                <p className="form-control">{user.email}</p>
              </div>
              {user.emailVerified ? (
                <p className="text-success">Email Verified</p>
              ) : (
                <>
                  <button
                    className="btn btn-dark btn-block m-1"
                    onClick={handleResendVerificationEmail}
                  >
                    Send Verification Email
                  </button>
                  {emailVerificationSent && (
                    <p className="text-success mt-2">Verification email sent! Please check your inbox.</p>
                  )}
                </>
              )}
              <div className="form-group">
                <button className='btn btn-dark m-1'>
                  <Link to='/passwordchange' className='text-decoration-none text-white'>Change Password</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
