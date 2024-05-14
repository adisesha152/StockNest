import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { getAuth } from 'firebase/auth';
import Footer from './Footer';

const Stock = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState('1month');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const params = useParams();
  const [walletBalance, setWalletBalance] = useState(null);
  const [buyQty, setBuyQty] = useState('');
  const [sellQty, setSellQty] = useState('');
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [orderType, setOrderType] = useState(null);

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

    const fetchData = async (range) => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${params.symbol}?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3&serietype=line&range=${range}`);
        setStockData({...response.data, range});
        setLoading(false);
      } catch (error) {
        setError('Error fetching stock data. Please try again later.');
        setLoading(false);
      }
    };

    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${params.symbol}?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`);
        setCompanyDetails(response.data[0]);
      } catch (error) {
        setError('Error fetching company details. Please try again later.');
        console.error('Error fetching company details:', error);
      }
    };

    useEffect(() => {
    if (!stockData || selectedRange !== stockData.range) {
      fetchData(selectedRange);
    }
    if (!companyDetails) {
      fetchCompanyDetails();
    }
  }, [selectedRange]);

  useEffect(() => {
    if (!loading && !error && stockData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: stockData.historical.map(item => item.date).reverse(),
          datasets: [{
            label: 'Price',
            data: stockData.historical.map(item => item.close).reverse(),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            pointRadius: 0,
          }]
        },
        options: {
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              intersect: false,
              mode: 'index',
              callbacks: {
                label: (context) => {
                  return `Price: $${context.raw}`;
                },
              },
              axis: 'xy',
              enabled: true,
            },
          },
          title: {
            display: false,
          },
          layout: {
            padding: {
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            },
          },
          animation: {
            duration: 1000,
          },
          responsive: true,
        },
      });
    }
  }, [loading, error, stockData, selectedRange]);
  

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleBuy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/buy', {
        email: user.email,
        stockSymbol: companyDetails.symbol,
        company: companyDetails.companyName,
        quantity: buyQty,
        price: companyDetails.price,
      });
      console.log('Buy response:', response.data);
      setWalletBalance(walletBalance - (buyQty * companyDetails.price));
      setTransactionDetails(response.data);
      setOrderType('Buy');
      console.log(response.data);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error('Error buying stock:', error);
    }
  };
  
  const handleSell = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/sell', {
        email: user.email,
        stockSymbol: companyDetails.symbol,
        company: companyDetails.companyName,
        quantity: sellQty,
        price: companyDetails.price,
      });
      console.log('Sell response:', response.data);
      setWalletBalance(walletBalance + (sellQty * companyDetails.price));
      setOrderType('Sell');
    } catch (error) {
      console.error('Error selling stock:', error);
    }
  };

  return (
    <div>
    <div className='d-flex m-5' style={{ margin: '200px' }}>
      <div className=''>
        <div>
          <div className='rounded-5 d-flex justify-content-between'>
            <div>
                <img src={companyDetails.image} alt={companyDetails.companyName} className='' style={{ width: '70px', backgroundColor: '' }} />
            </div>
            <div>
                <button className='btn rounded-5' style={{border: '1px solid black', marginTop: '20px'}}><i className='bi bi-bookmark'></i> Watchlist</button>
            </div>
          </div>
          <h2 style={{ marginTop: '10px' }}>{companyDetails.companyName}</h2>
          <pre className='fs-3'>${companyDetails.price} <span className='fs-5'>{companyDetails.changes}</span></pre>
          <div className="row ">
            <div className="">
              <canvas ref={chartRef}></canvas>
              <hr></hr>
              <div className='d-flex justify-content-evenly'>
                <button className='btn rounded-5' style={{ border: '1px solid black' }} onClick={() => handleRangeChange('1month')}>1M</button>
                <button className='btn rounded-5' style={{ border: '1px solid black' }} onClick={() => handleRangeChange('3months')}>3M</button>
                <button className='btn rounded-5' style={{ border: '1px solid black' }} onClick={() => handleRangeChange('6months')}>6M</button>
                <button className='btn rounded-5' style={{ border: '1px solid black' }} onClick={() => handleRangeChange('1year')}>1Y</button>
                <button className='btn rounded-5' style={{ border: '1px solid black' }} onClick={() => handleRangeChange('5years')}>5Y</button>
              </div>
            </div>
          </div>
        </div>
        <div className="m-5" style={{ marginRight: '100px' }}>
          <h4>Company Details</h4>
          {companyDetails && (
              <>
              <div className='d-flex' style={{ maxWidth: '800px', marginTop: '30px'}}>
                <div>
                <p>Symbol: {companyDetails.symbol}</p>
                  <p>Industry: {companyDetails.industry}</p>
                  <p>Website: <a href={companyDetails.website} className='text-decoration-none text-secondary' target="_blank" rel="noopener noreferrer">{companyDetails.website}</a></p>
                  <p>Market Cap: ${companyDetails.mktCap}</p>
                  
                  <p>Open: {stockData.historical[0].open}</p>
              <p>Low: {stockData.historical[0].low}</p>
                </div>
                <div style={{ marginLeft: '50px' }}>
                  <p>CEO: {companyDetails.ceo}</p>
                  <p>Price: ${companyDetails.price}</p>
                  <p>Volume: {companyDetails.volAvg}</p>
                  
                  <p>Changes: {companyDetails.changes}</p>
                  <p>Close: ${stockData.historical[0].close}</p>
                  <p>High: {stockData.historical[0].high}</p>
                </div>
              </div>
              <p className='fs-3'>About {companyDetails.companyName}</p>
              <p>{companyDetails.description}</p>
            </>
          )}
        </div>
      </div>
      <div className=''>
        <div className='shadow rounded-5 p-5 ' style={{ width: '450px', marginLeft: '50px', marginTop: '120px' }}>
          {stockData.historical && (
            <>
            <p className='fs-4'>{companyDetails.companyName}</p>
            <p className=''>${companyDetails.price} <small>{companyDetails.changes}</small></p>
            <nav>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <button className='nav-link active' id='nav-buy-tab' data-bs-toggle='tab' data-bs-target='#nav-buy' type='button' role='tab' aria-controls='nav-buy' aria-selected='true'>Buy</button>
                <button className='nav-link' id='nav-sell-tab' data-bs-toggle='tab' data-bs-target='#nav-sell' type='button' role='tab' aria-controls='nav-sell' aria-selected='false'>Sell</button>
              </div>
            </nav>
            <div className='tab-content'>
              <div className='tab-pane fad show active' id='nav-buy' role='tabpanel' aria-labelledby="nav-buy-tab">
                <form>
                  <div style={{marginTop: '20px'}}>
                    <label>Qty</label>
                    <input type='number' className='form-control' value={buyQty} onChange={(e) => setBuyQty(e.target.value)} />
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <label>Price</label>
                    <p className='form-control'>{companyDetails.price}</p>
                  </div>
                  <div className='d-flex justify-content-between' style={{marginTop: '10px'}}>
              <p>Balance: ${walletBalance}</p>
              <p>Required: ${buyQty * companyDetails.price}</p>
            </div>
            <button className="btn btn-success" style={{width: '355px'}} onClick={handleBuy}>Buy</button>
                </form>
              </div>
              <div className='tab-pane fad' id='nav-sell' role='tabpanel' aria-labelledby="nav-sell-tab">
                <form>
                  <div style={{marginTop: '20px'}}>
                    <label>Qty</label>
                    <input type='number' className='form-control' value={sellQty} onChange={(e) => setSellQty(e.target.value)} />
                  </div>
                  <div style={{marginTop: '20px'}}>
                    <label>Price</label>
                    <p className='form-control'>{companyDetails.price}</p>
                  </div><div className='d-flex justify-content-between' style={{marginTop: '10px'}}>
              <p>Balance: ${walletBalance}</p>
              <p>Required: ${buyQty * companyDetails.price}</p>
            </div>
            <button className="btn btn-dange" style={{width: '355px', border: '1px solid black'}} onClick={handleSell}>Sell</button>
                </form>
              </div>
            </div>
            {/* <div className='d-flex justify-content-between' style={{marginTop: '10px'}}>
              <p>Balance: ${walletBalance}</p>
              <p>Required: ${buyQty * companyDetails.price}</p>
            </div>
            <div className='tab-pane fade show active' id='nav-buy' role='tabpanel' aria-labelledby="nav-buy-tab">
              <button className="btn btn-dark" style={{width: '150px'}} onClick={handleBuy}>Buy</button>
            </div>
            <div className='tab-pane fade' id='nav-sell' role='tabpanel' aria-labelledby="nav-sell-tab">
              <button className="btn btn-dange" style={{width: '150px', border: '1px solid black'}} onClick={handleSell}>Sell</button>
            </div> */}
          </>          
          )}
          {/* <div className="d-flex justify-content-between">
            <button className="btn btn-dark" style={{width: '150px'}} onClick={handleBuy}>Buy</button>
            <button className="btn btn-dange" style={{width: '150px', border: '1px solid black'}} onClick={handleSell}>Sell</button>
          </div> */}
        </div>
      </div>
    </div>
    {successModalOpen && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-succes">Success!</h5>
                {/* <button type="button" className="btn-close" aria-label="Close" onClick={() => setSuccessModalOpen(false)}></button> */}
              </div>
              <div className="modal-body">
                {/* Render transaction details */}
                {transactionDetails && (
                  <div>
                    <p className='text-success'>Stock purchased successfully!</p>
                    {/* <p>Transaction ID: {transactionDetails.transactionId}</p> */}
                    <p>Order Type: {orderType}</p>
                    <p>Price: ${companyDetails.price}</p>
                    <p>Quantity: {buyQty}</p>
                    {/* Render other transaction details as needed */}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={() => setSuccessModalOpen(false)}>Done</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
      </div>
  );
};

export default Stock;
