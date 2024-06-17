import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const UserStocks = () => {
  const [topNSEStocks, setTopNSEStocks] = useState([]);
  const [topNSEStocks1, setTopNSEStocks1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopNSEStocks = async () => {
      try {
        const response = await axios.get(
          'https://financialmodelingprep.com/api/v3/stock/list?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3'
        );

        const nseStocks = response.data.filter(stock => stock.exchangeShortName === 'NASDAQ');
        const top10NSEStocks = nseStocks.slice(4840, 4860);
        const top10NSEStocks1 = nseStocks.slice(3990,4010);

        setTopNSEStocks(top10NSEStocks);
        setTopNSEStocks1(top10NSEStocks1);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchTopNSEStocks();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleErrorImage = (e) => {
    e.target.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///8AAAC6urrQ0NBZWVnx8fH5+fk4ODjr6+vT09NCQkKTk5OcnJyEhISlpaVvb28WFhaMjIx7e3urq6stLS3Hx8f19fVPT0/a2tq0tLRiYmLs7Oxzc3O/v7/i4uIODg4mJiZUVFRJSUkbGxs0NDR+fn57lU0YAAAECElEQVR4nO2d6XqqMBQAq3XXuqG4UbTt7fu/4q0KaRJ2aDTkm/lHAJMpy0lOon15AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACiif+je2Zqtx/e6Koe+2QoFr52IneGKph2NV8MVxgjDnumaZs4b6ooOGmqKLhqqz6KLhuHGccP92fG7dOv6u/TQcdxwrgu6Zpjo0bhmuJbVjnP3DI+y4Dq6ZR0yHOxkwdW1aO6UYX8oC87uhXOHDMOlLHiIi+fOGI6Vjow0zJ4aHnILDBuqHZm9vGtgpMIkZg27st9XaKKKQowaerLg5GSghhI0NfSm2Q1XOjKffs0WNqWh4eLnzGCfvi+QBT8atLEZjQzjF+XkPeW10ZMFg8YNrU0TQynvcplpN6v/IQuu/qaxtahv2Fcu0s9lGss7J/Ku+R82uDK1DfUh++1mjXeOlDh/yPsc49Q1fEsK/rCc3XL1e6XwUZ2XDOoZhpOEXMx6rF3ecfHHGaWWYSLnovApb5yf05GRqGE4WOQKKgwfNcOUTXXD8UVx2BwTWr/sHtW9zqGyoTa/0vNfwvS3TqX7wiAVDX0tCN4j3cC76HJX1iYbXppqhloQ3Pz2SLc93a8zNdboSlQyXGnXSHnK9Jv1qR0ZiQqGIy0IJroqvrfJ2fssyht2Vb9h6rhw+xHtfnJHRqKs4SBQBTNHC+HbNbmWMWR8BiUN98rkZuecd4n63i7RkZmt7rw9PkCWM9RmjnZVMxID8Qd6fB+njKEeBGeVaxkMrTbcqrPTmxqDBbsNtSC4qPMk2Wx4KgqCpbDYUA+Co3q1WGs4WKuCb3VrsdVQXeHTpJ9iqWHTIChhpaGvjd1zg2A4isjYb6Ph65fi95UbBEfxYf8yDrDQUFv/cswPgsJwmHGAdYb6SNAr+JDWGb6rfsPClGfbDL9Vwe/iblq7DEMtbfaectLuvLwRZ+xbZeipfrvUXIV4TNtn6GsJ+4yEYHsNx2oQzJw2aq1h6SDYTsNjX1lCmBsECw27wfpGEL2nrDDcqHfoJi8fWGgo8gJRb9YKQ5X81SGFhuJ+t9awm39S6w0/i3IVbTdMJOz3c+9OvOi15YbJtbtisP8dFbTa8JiSqxCGcSaqzYap05oOGS7Tg6A7hllB0BnDzIS9I4aX7FyFI4Y584cYts/wFBNtO2c4WkZ0ogL3DOMiDDHE8DFgeAVDDDE0C4ZXMMQQQ7NgeAVDDDE0C4ZXMMTQOsOTbijWusXz38Iwmo3rx9uT6ADxZeF4PtIGw0uwiPhd4H0vCsQX7IdRgVh609POWN63A/EnmESfKn4O6+lzwMbBEEMMMcQQQxsNxf9GeAwHC37OBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFrEf5h0RXCuoYDhAAAAAElFTkSuQmCC';
  }

  return (
    <div className='m-5'>
      <div className="row m-5">
        <p className='fs-1'>Frequently bought on StockNest</p>
        {topNSEStocks1.map((stock, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <Link to={`/stock/${stock.symbol}`} className="card-link text-decoration-none">
              <div className="card">
                <div className="card-body">
                  <img src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`} alt={stock.symbol} onError={handleErrorImage} className="crypto-image rounded-2" />
                  <h5 className="card-title">{stock.name}</h5>
                  <p className="card-text">{stock.symbol.toUpperCase()}</p>
                  <p className="card-text">${stock.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="row m-5">
        <p className='fs-1'>Trending</p>
        {topNSEStocks.map((stock, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <Link to={`/stock/${stock.symbol}`} className="card-link text-decoration-none">
              <div className="card">
                <div className="card-body">
                  <img src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png?apikey=ncWVUBudgtVvL9aVvu0hfWPSRYxoJiK3`} alt={stock.symbol} onError={handleErrorImage} className="crypto-image rounded-2" />
                  <h5 className="card-title">{stock.name}</h5>
                  <p className="card-text">{stock.symbol.toUpperCase()}</p>
                  <p className="card-text">${stock.price}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStocks;
