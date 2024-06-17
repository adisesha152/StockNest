import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#f0f0f0', borderRadius: '30px', padding: '50px', marginTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>We are dedicated to providing the best stock trading experience for both beginners and experts.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className='text-decoration-none text-secondary'>Home</Link></li>
              <li><Link to="/news" className='text-decoration-none text-secondary'>News</Link></li>
              <li><Link to="/stocks" className='text-decoration-none text-secondary'>Stocks</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <hr/>
        <p><i className='bi bi-c-circle'> 2016-2024. All rights reserved. Built with <i className='bi bi-heart'></i> in India</i></p>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>Follow us:</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#"><i className="bi bi-facebook fs-4 m-2"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-twitter fs-4 m-2"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-instagram fs-4 m-2"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-linkedin fs-4 m-2"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
