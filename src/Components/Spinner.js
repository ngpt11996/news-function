import React from 'react'
import Loading from './../spinner.gif'

const Spinner = () => {
  return (
    <div className="text-center my-3">
        <img style={{height: '50px',width: '50px'}} src={Loading} alt="Loading.." />
    </div>
  )
}

export default Spinner
