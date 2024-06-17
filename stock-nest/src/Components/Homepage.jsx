import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Homepage = () => {
  const [isOpen, setIsOpen] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
    faq5: false
  });

  const toggleAccordion = (faqKey) => {
    setIsOpen(prevState => ({
      ...prevState,
      [faqKey]: !prevState[faqKey]
    }));
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: -50
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
    style={{position: 'relative'}}
    initial="initial"
    animate="animate"
    variants={pageVariants}
    >
    <div style={{ position: 'relative' }}>
      <div className="homepage-container">
        <div className='container-fluid'>
          <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-8 col-sm-10 col-12 m-5'>
              <div className='p-2 m-3 text-center'>
                <h1>Stock Trading Simulator</h1>
                <p className='text-secondary'>Experience the thrill of the stock market without risk</p>
                <Link to='/register'><button className='btn btn-success rounded-3'>Get Started</button></Link>
              </div>
              <div className='d-flex justify-content-center'>
                <img src='/hero.png' height='400px' className='img-fluid'></img>
              </div>
              <div className='d-flex justify-content-center'>
                <div className='bi bi-arrow-down fs-1 m- p- d-none d-lg-block'></div>
              </div>
            </div>
          </div>
        </div>
        <div className=' m-4 p-4'>
          <div className='d-flex justify-content-center'><i className='bi bi-magic fs-1'></i></div>
          <div className='text-center m-2 p-2'>
            <h1 className='fs-1'>Packed with <br></br>everything you need.</h1>
          </div>
        </div>
        <div className='d-flex row justify-content-center m-3 p-3 '>


        <div className='card w-75 rounded-5 m-3 p-5 bg-light'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-8 mt-5'>
                <div className='bi bi-broadcast fs-2 mb-4'></div>
                <p className='card-title fs-2'>Markets in a snapshot.</p>
                <p className='card-text text-secondary'>Simplified enough for beginners.<br></br>Detailed enough for experts.</p>
                <Link to='/stocks'><button className='btn btn-dark rounded-5 mt-3'>Try it out <i className='bi bi-arrow-right'></i></button></Link>
              </div>
              <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <img src='card.jpeg' style={{width: '200px', height: '400px'}} className='img-fluid rounded-5'></img>
              </div>
            </div>
          </div>
        </div>

          <div className='card w-75 rounded-5 m-3 p-5 bg-light'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 mt-5'>
              <div className='bi bi-fast-forward fs-2 mb-4'></div>
              <p className='card-title fs-2'>Fast order execution.</p>
              <p className='card-text text-secondary'>Never miss a market move.<br></br>Trade in a breeze.</p>
              <p className='mt-3'></p>
              <Link to='/stocks'><button className='btn btn-dark rounded-5 mt-3'>Order now <i className='bi bi-arrow-right'></i></button></Link>
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <img src='card2.jpeg' style={{width: '200px', height: '400px'}} className='img-fluid rounded-5'></img>
              </div>
            </div>
            </div>
          </div>

          <div className='card w-75 rounded-5 m-3 p-5 bg-light'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 mt-5'>
              <div className='bi bi-megaphone fs-2 mb-4'></div>
              <p className='card-title fs-2'>Stocks at your fingertips.</p>
              <p className='card-text text-secondary'>Track all your stocks.<br></br>Place your bids on the right time.</p>
              <Link to='/stocks'><button className='btn btn-dark rounded-5 mt-3'>Try it out <i className='bi bi-arrow-right'></i></button></Link>
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <img src='card12.png' style={{width: '200px', height: '400px'}} className='img-fluid rounded-5'></img>
              </div>
          </div>
          </div>
          </div>

          <div className='card w-75 rounded-5 m-3 p-5 bg-light'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-8 mt-5'>
              <div className='bi bi-graph-up fs-2 mb-4'></div>
              <p className='card-title fs-2'>Advanced charts.</p>
              <p className='card-text text-secondary'>Leverage advanced tools.<br></br>Make the best decisions.</p>
              <Link to='/stocks'><button className='btn btn-dark rounded-5 mt-3'>Try it out <i className='bi bi-arrow-right'></i></button></Link>
            </div>
            <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <img src='card4.jpeg' style={{width: '200px', height: '400px'}} className='img-fluid rounded-5'></img>
              </div>
          </div>
          </div>
          </div>
        </div>

      </div>

    {/* <div className='bg-black rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <h1 className='text-white'>Ready to get started?</h1>
              <p className='text-secondary'>Sign up now and start trading stocks today</p>
              <Link to='/register'><button className='btn btn-success rounded-3'>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div> */}

    <div className='bg-black rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <h1 className='text-white'>Open your account in a minute</h1>
              {/* <p className='text-secondary'>Sign up now and start trading stocks today</p> */}
              <Link to='/register'><button className='btn btn-success rounded-3 mt-4'>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Additional Content Section */}
      <div className="container py-5 mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2 className="mb-4">Why Choose Us?</h2>
            <p className="lead text-secondary">Discover what sets our stock trading simulator apart from the rest.</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body">
                <h4 className="card-title">Realistic Simulation</h4>
                <p className="card-text text-secondary">Experience the thrill of the stock market without risking real money through our realistic simulation.</p>
              </div>
            </div>
          </motion.div>
          </div>
          
          <div className="col-md-4 mb-5">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body">
                <h4 className="card-title">User-Friendly Interface</h4>
                <p className="card-text">Our intuitive and easy-to-use interface makes trading effortless for users of all experience levels.</p>
              </div>
            </div>
          </motion.div>
          </div>
          <div className="col-md-4 mb-5">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body">
                <h4 className="card-title">Comprehensive Tools</h4>
                <p className="card-text">Access advanced tools and resources to make informed trading decisions and stay ahead of the market.</p>
              </div>
            </div>
            </motion.div>
          </div>
          <div className="col-md-4 mb-5">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body">
                <h4 className="card-title">Community Support</h4>
                <p className="card-text">Join a thriving community of traders to share insights, strategies, and experiences for mutual growth.</p>
              </div>
            </div>
            </motion.div>
          </div>
          <div className="col-md-4 mb-5">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body ">
                <h4 className="card-title">Customer Satisfaction</h4>
                <p className="card-text">We prioritize customer satisfaction and continually improve our platform based on user feedback.</p>
              </div>
            </div>
            </motion.div>
          </div>
          <div className="col-md-4 mb-5">
          <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{duration: 0.4}}
        >
            <div className="card h-100 shadow-sm rounded-5 p-5">
              <div className="card-body">
                <h4 className="card-title">Accessible Anywhere</h4>
                <p className="card-text">Trade seamlessly on the go with our platform accessible on desktops, laptops, tablets, and smartphones.</p>
              </div>
            </div>
            </motion.div>
          </div>
        </div>
      </div> 

    

<div>
<div className="container py-5">
      <div className="row">
        <div className="col-md-12 text-center">
          <i className='bi bi-question-circle fs-1'></i>
          <h1 className="mb-3">Get started</h1>
          <p className='text-secondary mb-5 fs-5'>Questions? We have you covered.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 mb-5 ">
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className={`accordion-button ${isOpen.faq1 ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleAccordion('faq1')}
                  aria-expanded={isOpen.faq1}
                  aria-controls="collapseOne"
                >
                  How do I sign up?
                </button>
              </h2>
              <div
                id="collapseOne"
                className={`accordion-collapse collapse ${isOpen.faq1 ? 'show' : ''}`}
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Signing up is easy! Simply click on the "Get Started" button and follow the prompts to create your account.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className={`accordion-button ${isOpen.faq2 ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleAccordion('faq2')}
                  aria-expanded={isOpen.faq2}
                  aria-controls="collapseTwo"
                >
                  How does the simulator work?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className={`accordion-collapse collapse ${isOpen.faq2 ? 'show' : ''}`}
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Our simulator replicates the real stock market using simulated data. You can buy, sell, and track stocks just like in real life, but without any financial risk.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className={`accordion-button ${isOpen.faq3 ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleAccordion('faq3')}
                  aria-expanded={isOpen.faq3}
                  aria-controls="collapseThree"
                >
                  Is there a fee for using the simulator?
                </button>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse ${isOpen.faq3 ? 'show' : ''}`}
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  No, our simulator is completely free to use. You can sign up and start trading stocks without any subscription fees or charges.
                </div>
              </div>
            </div>
            {/* Add more accordion items for additional FAQ entries */}

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className={`accordion-button ${isOpen.faq4 ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleAccordion('faq4')}
                  aria-expanded={isOpen.faq4}
                  aria-controls="collapseThree"
                >
                  Can I trade real stocks on this platform?
                </button>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse ${isOpen.faq4 ? 'show' : ''}`}
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                No, our platform is a simulation tool for educational purposes only. You cannot trade real stocks through our platform.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className={`accordion-button ${isOpen.faq5 ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => toggleAccordion('faq5')}
                  aria-expanded={isOpen.faq5}
                  aria-controls="collapseThree"
                >
                  Is customer support available?
                </button>
              </h2>
              <div
                id="collapseThree"
                className={`accordion-collapse collapse ${isOpen.faq5 ? 'show' : ''}`}
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                Yes, we offer customer support to assist you with any questions or issues you may encounter while using our platform.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

{/* <div className='bg-black rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <h1 className='text-white'>Open your account in a minute</h1>
              {/* <p className='text-secondary'>Sign up now and start trading stocks today</p> */}
              {/* <Link to='/register'><button className='btn btn-success rounded-3 mt-4'>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div> */}

    <div className='bg-black rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <h1 className='text-white'>Ready to get started?</h1>
              <p className='text-secondary'>Sign up now and start trading stocks today</p>
              <Link to='/register'><button className='btn btn-success rounded-3'>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>


      <Footer style={{ position: 'absolute', bottom: 0, marginTop: '100px' }} />
    </div>
    </motion.div>
  );
};

export default Homepage;
