import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      // try {
      //   const response = await fetch(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=6e9d460d81e74320ae41e5c08747b391`);
      //   const data = await response.json();
      //   setNews(data.articles);
      //   setLoading(false);
      // } catch (error) {
      //   console.error('Error fetching news:', error);
      //   setError('An error occurred while fetching the news. Please try again later.');
      //   setLoading(false);
      // }
      axios.get(`https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=6e9d460d81e74320ae41e5c08747b391`)
      .then(response => {
        setNews(response.data.articles)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data");
        setError("An error occured while trying to fetch")
      })
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className='text-center m-5'>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='border-bottom loading'>Loading...</motion.h1>
      </div>
    );
  }

  if (error) {
    return <div className='text-center'>{error}</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='container'>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center my-5'>Latest <span className='badge bg-dark'> News</span></motion.h1>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {news.map((article, index) => (
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
    </motion.div>
  );
};

export default News;
