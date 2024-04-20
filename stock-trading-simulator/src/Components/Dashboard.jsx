import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="my-4 text-center m-5 p-5">Stock Trading Simulator Dashboard</h1>
      <div className="row">
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
              <h2 className="card-title">View News</h2>
              <p className="card-text">Stay updated with the latest news and trends in the market.</p>
            </div>
            <div className="card-footer">
              <Link to="/news" className="btn btn-dark">View News</Link>
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
      </div>
    </motion.div>
  );
}

export default Dashboard;
