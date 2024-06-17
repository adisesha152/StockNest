import React from 'react'

const Stocks = () => {
  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 col-md-8 col-sm-10'>
            <div className='d-flex flex-column justify-content-center align-items-center text-center m-5 p-5'>
              <h1 className=''>Stocks</h1>
              <p className='text-secondary'>List of stocks available for trading</p>
              <div className='d-grid'>
                <button className='btn btn-dark rounded-5'>Get Stocks</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stocks