import React, { useState, useEffect } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';
import { Pagination } from '@mui/material';

const Orders = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
          const response = await axios.get('http://localhost:3000/auth/transactions', {
            params: {
              email: user.email
            }
          });
          setTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  
  },[user])

  if (!user) {
    return <Loader/>;
  }

const reversedTransactions = [...transactions].reverse();
const firstIndex = (page - 1) * transactionsPerPage;
const lastIndex = page * transactionsPerPage;
const currentTransactions = reversedTransactions.slice(firstIndex, lastIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
      <div className="col-md-6">
    <div className="card shadow-lg rounded-5 m-4 p-5">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Orders</h2>
        {/* <p className='fs-5'><b>Balance: </b>${walletBalance}</p> */}
        {/* Display transactions */}
        <ul className="list-group">
          {currentTransactions.map((transaction, index) => (
            <li key={index} className="list-group-item">
                  <p>{transaction.timestamp}</p>
              <div className="d-flex justify-content-between">
                <div>
                  <p>{transaction.company}</p>
                  <p>{transaction.quantity} Qty</p>
                </div>
                <div>
                  {/* <p>${transaction.amount}</p> */}
                  <p>{transaction.type}</p>
                  <p>At ${transaction.price}</p>
                  {/* You can add more details as needed */}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Pagination 
                count={Math.ceil(transactions.length / transactionsPerPage)} 
                page={page}
                onChange={handlePageChange}
                color='success'
                className='m-3'
              />
        </div>
        </div>
        </div>
        </div>
        </div>
  )
}

export default Orders