import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { motion } from 'framer-motion';
import Login from './Login';
import './login.css'

const Homepage = () => {

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
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
                <h1 style={{fontSize: '80px', color: '#5E5E5E'}}>Stock Trading Simulator</h1>
                <p className='text-secondary' style={{fontSize: '20px'}}>Experience the thrill of the stock market without risk.</p>
                <Link to='/register'>
                  <button className='btn btn-success rounded-3' onClick={handleLoginClick}>Get Started</button>
                  </Link>
              </div>
              <div className='d-flex justify-content-center'>
                <img src='/hero.png' 
                // className='img-fluid'
                style={{width: '1100px', height: '100%'}}
                ></img>
              </div>
              {/* <div className='d-flex justify-content-center'>
                <div className='bi bi-arrow-down fs-1 m- p- d-none d-lg-block'></div>
              </div> */}
            </div>
          </div>
        </div>
        <div className=' m-4 p-4'>
          <div className='d-flex justify-content-center'><i className='bi bi-magic' style={{fontSize: '60px'}}></i></div>
          <div className='text-center m-2 p-2'>
            <p className='' style={{fontSize: '60px'}}>Packed with <br></br>everything you need.</p>
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

    <div className='rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px', background: '#202020' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <p className='text-white' style={{fontSize: '70px'}}>Open your account in a minute</p>
              <Link to='/register'><button className='btn btn-success rounded-3 mt-4'>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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
            <div className="card h-100 shadow-sm rounded-5 p-5 bg-light">
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

          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                How do I sign up?
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                Signing up is easy! Simply click on the "Get Started" button and follow the prompts to create your account.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                How does the simulator work?
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                Our simulator replicates the real stock market using simulated data. You can buy, sell, and track stocks just like in real life, but without any financial risk.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Is there a fee for using the simulator?
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                No, our simulator is completely free to use. You can sign up and start trading stocks without any subscription fees or charges.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Can I trade real stocks on this platform?
                </button>
              </h2>
              <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                No, our platform is a simulation tool for educational purposes only. You cannot trade real stocks through our platform.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingFive">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                Is customer support available?
                </button>
              </h2>
              <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                Yes, we offer customer support to assist you with any questions or issues you may encounter while using our platform.
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</div>

    <div className='rounded-5' style={{ height: '120vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px', background: '#202020' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
            <div className='p-2 m-3 text-center'>
              <p className='text-white' style={{fontSize: '70px'}}>Ready to get started?</p>
              <p className='text-secondary' style={{fontSize: '20px'}}>Sign up now and start trading stocks today</p>
              <Link to='/register' ><button className='btn btn-success rounded-3 ' style={{marginTop: '20px'}}>Get Started</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    {showLoginModal && (
        <div className="login-modal">
          <div className="login-overlay"></div>
          <Login setIsLoggedIn={() => {}} />
        </div>
      )}


      <Footer style={{ position: 'absolute', bottom: 0, marginTop: '100px' }} />
    </div>
    </motion.div>
  );
};

export default Homepage;
