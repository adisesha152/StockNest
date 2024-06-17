import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Footer from './Footer';
import Loader from './Loader';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=6e9d460d81e74320ae41e5c08747b391`);
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('An error occurred while fetching the news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className='text-center m-5'>
        <Loader/>
        {/* <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className=' loading'>Loading...</motion.h1> */}
      </div>
    );
  }

  if (error) {
    return <div className='text-center'>{error}</div>;
  }

  return (
    <div>
    <div className='m-5'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='container'>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center my-5'>Latest <span className='badge bg-dark'> News</span></motion.h1>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {currentNews.map((article, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }} className='col'>
            <div className='card'>
              {article.urlToImage && <img src={article.urlToImage} className='card-img-top' alt='...' />}
              <div className='card-body'>
                <h5 className='card-title'>{article.title}</h5>
                <p className='card-text'>{article.description}</p>
                <a href={article.url} className='btn btn-dark' target='_blank' rel='noopener noreferrer'>Read More</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className='d-flex justify-content-center mt-4'>
        <Stack spacing={2}>
          <Pagination count={Math.ceil(news.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color='success' />
        </Stack>
      </div>
    </motion.div>
    </div>
    <Footer/>
    </div>
  );
};

export default News;
