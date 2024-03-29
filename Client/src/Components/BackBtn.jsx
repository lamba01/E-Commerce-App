import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Backbtn.css'

function BackBtn() {
    const navigate = useNavigate();

    const goBackToList = () => {
      navigate('/shop'); // Use navigate to go back to the product list
    };
  return (
    <div><button className='backbtn' onClick={goBackToList}>Continue Shopping</button></div>
  )
}

export default BackBtn