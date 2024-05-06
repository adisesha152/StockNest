import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Typography, Pagination } from '@mui/material';
import Footer from './Footer';

const StocksTable = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`);
        const nseStocks = response.data.filter(stock => stock.exchangeShortName === 'NASDAQ');
        setStocks(nseStocks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stocks:', error);
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAC6urrQ0NBZWVnx8fH5+fk4ODjr6+vT09NCQkKTk5OcnJyEhISlpaVvb28WFhaMjIx7e3urq6stLS3Hx8f19fVPT0/a2tq0tLRiYmLs7Oxzc3O/v7/i4uIODg4mJiZUVFRJSUkbGxs0NDR+fn57lU0YAAAECElEQVR4nO2d6XqqMBQAq3XXuqG4UbTt7fu/4q0KaRJ2aDTkm/lHAJMpy0lOon15AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACiif+je2Zqtx/e6Koe+2QoFr52IneGKph2NV8MVxgjDnumaZs4b6ooOGmqKLhqqz6KLhuHGccP92fG7dOv6u/TQcdxwrgu6Zpjo0bhmuJbVjnP3DI+y4Dq6ZR0yHOxkwdW1aO6UYX8oC87uhXOHDMOlLHiIi+fOGI6Vjow0zJ4aHnILDBuqHZm9vGtgpMIkZg27st9XaKKKQowaerLg5GSghhI0NfSm2Q1XOjKffs0WNqWh4eLnzGCfvi+QBT8atLEZjQzjF+XkPeW10ZMFg8YNrU0TQynvcplpN6v/IQuu/qaxtahv2Fcu0s9lGss7J/Ku+R82uDK1DfUh++1mjXeOlDh/yPsc49Q1fEsK/rCc3XL1e6XwUZ2XDOoZhpOEXMx6rF3ecfHHGaWWYSLnovApb5yf05GRqGE4WOQKKgwfNcOUTXXD8UVx2BwTWr/sHtW9zqGyoTa/0vNfwvS3TqX7wiAVDX0tCN4j3cC76HJX1iYbXppqhloQ3Pz2SLc93a8zNdboSlQyXGnXSHnK9Jv1qR0ZiQqGIy0IJroqvrfJ2fssyht2Vb9h6rhw+xHtfnJHRqKs4SBQBTNHC+HbNbmWMWR8BiUN98rkZuecd4n63i7RkZmt7rw9PkCWM9RmjnZVMxID8Qd6fB+njKEeBGeVaxkMrTbcqrPTmxqDBbsNtSC4qPMk2Wx4KgqCpbDYUA+Co3q1WGs4WKuCb3VrsdVQXeHTpJ9iqWHTIChhpaGvjd1zg2A4isjYb6Ph65fi95UbBEfxYf8yDrDQUFv/cswPgsJwmHGAdYb6SNAr+JDWGb6rfsPClGfbDL9Vwe/iblq7DEMtbfaectLuvLwRZ+xbZeipfrvUXIV4TNtn6GsJ+4yEYHsNx2oQzJw2aq1h6SDYTsNjX1lCmBsECw27wfpGEL2nrDDcqHfoJi8fWGgo8gJRb9YKQ5X81SGFhuJ+t9awm39S6w0/i3IVbTdMJOz3c+9OvOi15YbJtbtisP8dFbTa8JiSqxCGcSaqzYap05oOGS7Tg6A7hllB0BnDzIS9I4aX7FyFI4Y584cYts/wFBNtO2c4WkZ0ogL3DOMiDDHE8DFgeAVDDDE0C4ZXMMQQQ7NgeAVDDDE0C4ZXMMTQOsOTbijWusXz38Iwmo3rx9uT6ADxZeF4PtIGw0uwiPhd4H0vCsQX7IdRgVh609POWN63A/EnmESfKn4O6+lzwMbBEEMMMcQQQxsNxf9GeAwHC37OBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFrEf5h0RXCuoYDhAAAAAElFTkSuQmCC';
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredStocks = stocks.filter((stock) => {
    return (searchTerm ? (stock.name && stock.name.toLowerCase().includes(searchTerm.toLowerCase())) || (stock.symbol && stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())) : true);
  });
  


  const indexOfLastStock = currentPage * 10;
  const indexOfFirstStock = indexOfLastStock - 10;
  const currentStocks = filteredStocks.slice(indexOfFirstStock, indexOfLastStock);

  return (
    <div>
    <div style={{maxWidth: '1225px', marginLeft: '100px'}}>
    <Box m={1}>
      <Box mb={4}>
        <Typography variant="h1" align="center" className='fs-2'>Stocks of NASDAQ</Typography>
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
              <TableCell>Name</TableCell>
                <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              currentStocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell><img src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`} className='rounded-2'  style={{ width: '30px' }} onError={handleImageError} /> {stock.name}</TableCell>
                
                  <TableCell>{stock.symbol.toUpperCase()}</TableCell>
                  <TableCell>${stock.price}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredStocks.length / 10)}
          page={currentPage}
          onChange={handlePageChange}
          color="success"
        />
      </Box>
    </Box>
    </div>
    <Footer/>
    </div>
  );
};

export default StocksTable;
