import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Nav = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <motion.nav
      className='navbar navbar-expand-lg navbar-light shadow'
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
    >
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          <span className='bi bi-box-seam fs-4'> StockNest</span>
        </Link>
        <button
          className={`navbar-toggler ${!collapsed ? 'collapsed' : ''}`}
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded={!collapsed ? true : false}
          aria-label='Toggle navigation'
          onClick={toggleNavbar}
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`} id='navbarNav'>
          <ul className='navbar-nav ms-auto gap-3 '>
            <li className='nav-item'>
              <Link
                to='/'
                className={`nav-link text-decoration-none ${location.pathname === '/' ? 'active' : ''}`}
              >
                <motion.span
                  className='fs-5'
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  Home
                </motion.span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/news'
                className={`nav-link text-decoration-none ${location.pathname === '/news' ? 'active' : ''}`}
              >
                <motion.span
                  className='fs-5'
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                >
                  News
                </motion.span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/stocks'
                className={`nav-link text-decoration-none ${location.pathname === '/stocks' ? 'active' : ''}`}
              >
                <motion.span
                  className='fs-5'
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                >
                  Stocks
                </motion.span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/crypto'
                className={`nav-link text-decoration-none ${location.pathname === '/crypto' ? 'active' : ''}`}
              >
                <motion.span
                  className='fs-5'
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                >
                  Crypto
                </motion.span>
              </Link>
            </li>
            <li className='nav-item mt-1'>
              <Link to='/register'>
                <motion.button
                  className='btn btn-dark rounded-5'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Log In / Register
                </motion.button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
