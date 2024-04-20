import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserNav = ({ handleLogout }) => {
  return (
    <div>
      <motion.nav
        className='navbar navbar-expand-lg navbar-light shadow'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='container'>
            <span className='bi bi-box-seam fs-4'> StockNest</span>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto gap-3 '>
              <li className='nav-item'>
                <Link to='dashboard' className='nav-link text-decoration-none'>
                  <motion.span
                    className='fs-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Dashboard
                  </motion.span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/portfolio' className='nav-link text-decoration-none'>
                  <motion.span
                    className='fs-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Portfolio
                  </motion.span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/stocks' className='nav-link text-decoration-none'>
                  <motion.span
                    className='fs-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Stocks
                  </motion.span>
                </Link>
              </li>
              <li className='nav-item mt-1'>
                <Link to='/login'>
                  <motion.button
                    onClick={handleLogout}
                    className='btn btn-dark rounded-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Log Out
                  </motion.button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default UserNav;
