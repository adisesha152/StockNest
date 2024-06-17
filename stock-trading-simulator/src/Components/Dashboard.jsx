import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StocksTable from './StocksTable';
import Stocks from './Stocks';
import { getAuth } from 'firebase/auth';
import UserStocks from './UserStocks';
import Wishlist from './Watchlist';

const Dashboard = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* <p className="fs-3" style={{marginTop: '40px', marginLeft: '60px'}}>Welcome {user.displayName},</p> */}
      <UserStocks/>
      {/* <Wishlist/> */}
      <Stocks/>
      
      {/* <div className="row">
        <motion.div
          className="col-md-4 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.3}}
        >
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Trade Stocks</h2>
              <p className="card-text">Start trading stocks in real-time simulation.</p>
            </div>
            <div className="card-footer">
              <Link to="/stocks" className="btn btn-dark">Trade Now</Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="col-md-4 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">View Crypto </h2>
              <p className="card-text">Stay updated with the latest crypto prices.</p>
            </div>
            <div className="card-footer">
              <Link to="/crypto" className="btn btn-dark">View Crypto</Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="col-md-4 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">View News</h2>
              <p className="card-text">Stay updated with the latest news and trends in the market.</p>
            </div>
            <div className="card-footer">
              <Link to="/account" className="btn btn-dark">Account Settings</Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="col-md-4 mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">Account Settings</h2>
              <p className="card-text">Manage your account settings and preferences.</p>
            </div>
            <div className="card-footer">
              <Link to="/account" className="btn btn-dark">Account Settings</Link>
            </div>
          </div>
        </motion.div>
      </div> */}
    </motion.div>
  );
}

export default Dashboard;
