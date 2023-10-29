import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Orderbtn.css'

const OrderBtn = () => {
    const placeOrder = async () => {
      try {
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
          // After successfully placing the order, send the email confirmation
          await handleSendEmailConfirmation(token);
        }
      } catch (error) {
        console.error('Error placing the order:', error);
        alert('Error placing the order. Please try again or contact support.');
      }
    };
  
    const handleSendEmailConfirmation = async (token) => {
      try {
        const response = await axios.post('/api/send-email-confirmation', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          console.log('Email confirmation sent:');
          goBackToShop()
        }
      } catch (error) {
        console.error('Error sending email confirmation:', error);
        alert('Error sending email confirmation. Please try again or contact support.');
      }
    };
    const navigate = useNavigate();
    const goBackToShop = () => {
      navigate('/'); // Use navigate to go back to the product list
    };
  
    return (
      <button className='place-order-btn' onClick={() => placeOrder()}>Complete</button>
    );
  };
  
  export default OrderBtn;
  