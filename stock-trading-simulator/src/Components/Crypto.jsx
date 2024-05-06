import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Crypto.css';
import CryptoTable from './CryptoTable';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Loader from './Loader';
import { Typography } from '@mui/material';

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: selectedCurrency,
            per_page: 10,
            page: 1
          }
        });
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, [selectedCurrency]);

  if (loading) {
    return (
      <div className='text-center m-5'>
        <Loader/>
        {/* <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='loading'>Loading...</motion.h1> */}
      </div>
    );
  }

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const getCurrencySymbol = () => {
    return selectedCurrency === 'inr' ? '₹' : '$';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
    <div className='m-3 p-5'>
      <div className="crypto-dropdown">
        <label htmlFor="currency" style={{marginLeft: '55px'}}>Choose Currency:</label>
        <select id="currency" value={selectedCurrency} onChange={handleCurrencyChange} className='rounded-3 m-2 p-1'>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
        </select>
      </div>
      <div className="crypto-carousel-container">
        <Typography variant="h1" align="center" className='fs-1 m-3'>Trending Coins</Typography>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {cryptoData.map((crypto, index) => (
              <div className="crypto-slide carousel-wrapper" key={index}>
                <img src={crypto.image} alt={crypto.name} className="crypto-image" />
                <h3 className="crypto-name">{crypto.name}</h3>
                <p className="crypto-symbol">{crypto.symbol.toUpperCase()}</p>
                <p className="crypto-price">{getCurrencySymbol()}{crypto.current_price.toFixed(2)}</p>
                <p className="crypto-market-cap">Market Cap: {getCurrencySymbol()}{crypto.market_cap.toLocaleString()}</p>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <CryptoTable currency={selectedCurrency} loading={loading} />
    </div>
    <Footer/>
    </div>
  );
};

export default Crypto;
