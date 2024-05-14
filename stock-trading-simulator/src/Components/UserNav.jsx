import React, {useEffect,useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import profileimage from '../assets/profile.png';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';


const UserNav = ({ handleLogout }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event, value) => {
    setSearchTerm(value);
  };

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      try {
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`
        );

        if (active) {
          setOptions(response.data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch stocks:', error);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, searchTerm]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleImageError = (e) => {
    e.target.src = profileimage;
  };

  const Logout = () => {
    axios.get('http://localhost:3000/logout').then((result) => {
      if (result.data === 'success') {
        localStorage.clear();
        navigate('/login');
      }
    });
  };

  return (
    <div>
      <motion.nav
        className='navbar navbar-expand-lg navbar-light shadow rounded-5 p-3'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='container'>
          <span className='bi bi-box-seam fs-4'> StockNest</span>
          <ul className='navbar-nav gap-3' style={{ marginLeft: '20px' }}>
            {/* Navigation Links */}
            <li className='fs-5 nav-item' >
                <Link to='dashboard' className='nav-link text-decoration-none'>
                  Explore
                </Link>
              </li>
              <li className='fs-5 nav-item'>
                <Link to='/investments' className='nav-link text-decoration-none'>
                  Investments
                </Link>
              </li>
          </ul>
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
          {/* Search Box */}
          <Autocomplete
            id='stock-search'
            sx={{ width: 500, marginLeft: 15}}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            onChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search Stocks'
                variant='outlined'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <SearchIcon sx={{ color: 'action.active' }} />
                  ),
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color='inherit' size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto gap-3 '>
              <li className='nav-item'>
                <Link to='dashboard' className='nav-link text-decoration-none'>
                  <motion.span
                    className='fs-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Dashboard */}
                    <i className='bi bi-house fs-4'></i>
                  </motion.span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/wallet' className='nav-link text-decoration-none'>
                  <motion.span
                    className='fs-5'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className='bi bi-wallet2 fs-4'></i>
                  </motion.span>
                </Link>
              </li>
              <li class="nav-item dropdown">
                <img class="nav-link dropdown-toggle rounded-5" src='' style={{width: '55px'}} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" onError={handleImageError}/>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to='/orders' className='dropdown-item'>
                     <i className='bi bi-card-checklist'></i> Orders
                    </Link>
                  </li>
                  <hr></hr>
                  <li>
                    <Link to='/watchlist' className='dropdown-item'>
                     <i className='bi bi-bookmarks'></i> Watchlist
                    </Link>
                  </li>
                  <hr></hr>
                  <li>
                    <Link to='/account' className='dropdown-item' >
                     <i className='bi bi-person'></i> Account
                    </Link>
                  </li>
                  <hr></hr>
                  <li className='dropdown-item mt-1' onClick={Logout}>
                    <Link to='/login' className='text-decoration-none text-dark' onClick={handleLogout}>
                        <i className='bi bi-box-arrow-right'></i> Log Out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default UserNav;
