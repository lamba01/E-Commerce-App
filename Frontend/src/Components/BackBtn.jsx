import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackBtn() {
    const navigate = useNavigate();

    const goBackToList = () => {
      navigate('/'); // Use navigate to go back to the product list
    };
  return (
    <div><button onClick={goBackToList}>Go Back</button></div>
  )
}

export default BackBtn