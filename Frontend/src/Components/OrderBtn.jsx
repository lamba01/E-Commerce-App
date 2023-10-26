import React from 'react';
import axios from 'axios';

function OrderBtn() {
  const placeOrder = async () => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in to place an order.');
        return;
      }

      // Make a request to your server to place the order with the JWT token
      const response = await axios.post('/api/place-order', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Order placed successfully');
        
        
      }
    } catch (error) {
      console.error('Error placing the order:', error);
      alert('Error placing the order. Please try again or contact support.');
    }
  };

  return (
    <button className='place-order-btn' onClick={placeOrder}>Place Order</button>
  );
}

export default OrderBtn;
