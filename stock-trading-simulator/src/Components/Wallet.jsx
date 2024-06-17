import React, { useState, useEffect } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';
import { Pagination } from '@mui/material';

const Wallet = () => {
    const auth = getAuth();
    const [user, setUser] = useState(null);
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
        return <Loader/>;
      }

  return (
    <div>
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
      </motion.div>
    </div>
  )
}

export default Wallet