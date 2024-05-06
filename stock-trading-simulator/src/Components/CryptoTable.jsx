import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Typography, Pagination } from '@mui/material';

const CryptoTable = ({ currency }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        const rankedCoins = response.data.map((coin, index) => ({ ...coin, rank: index + 1 }));
        setCoins(rankedCoins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(price);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastCoin = currentPage * 10;
  const indexOfFirstCoin = indexOfLastCoin - 10;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <Box m={5}>
      <Box mb={4}>
        <Typography variant="h1" align="center" className='fs-2'>Cryptocurrency by Market Cap</Typography>
        <TextField
          variant="outlined"
          label="Search by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Price ({currency.toUpperCase()})</TableCell>
              <TableCell>24h Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              currentCoins.map((coin, index) => (
                <TableRow key={coin.id}>
                  <TableCell>{coin.rank}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <img src={coin.image} alt={coin.name} style={{ width: '30px', marginRight: '10px' }} />
                      {coin.name}
                    </Box>
                  </TableCell>
                  <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                  <TableCell>{formatPrice(coin.market_cap)}</TableCell>
                  <TableCell>{formatPrice(coin.current_price)}</TableCell>
                  <TableCell style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredCoins.length / 10)}
          page={currentPage}
          onChange={handlePageChange}
          color="success"
        />
      </Box>
    </Box>
  );
};

export default CryptoTable;
