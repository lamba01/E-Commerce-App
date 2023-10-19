import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/AddToCartButton.css'

const AddToCartButton = ({ product, onaddToCart }) => {
  const navigate = useNavigate()
  const addToCart = async () => {
    try {

      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not logged in. Please log in to add products to your cart.');
        navigate('/login')
        return;
        
      }

      // Make a request to your server to perform the action with the JWT token
      const response = await axios.post('/api/add-to-cart', product,  {  headers: {
        Authorization: `Bearer ${token}`,
      }, } );

      if (response.status === 200) {
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('You are not logged in. Please log in to add products to your cart.');
      navigate('/login')
    }
  };

  return <button className='addtocart-btn' onClick={() => { addToCart(); onaddToCart(); }}>Add to cart</button>;

};

AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,
};

export default AddToCartButton;



