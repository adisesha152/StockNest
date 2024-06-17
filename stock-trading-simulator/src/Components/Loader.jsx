import React from 'react'
import LoaderSvg from '../assets/loader.svg';

const Loader = () => {
  return (
    <div className='d-flex justify-content-center'>
        <img src={LoaderSvg} className='img-fluid fs-5' 
        style={{maxHeight: '30vh',marginTop: '30vh'}}
        ></img>
    </div>
  )
}

export default Loader