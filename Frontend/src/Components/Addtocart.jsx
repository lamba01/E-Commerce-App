import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddToCartButton = ({ product }) => {
  const addToCart = async () => {
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('token');
      console.log(token)

      if (!token) {
        alert('You are not logged in. Please log in to add products to your cart.');
        return;
      }

      // Include the token in the request headers
      // const headers = {
      //   Authorization: `Bearer ${token}`,
      // };
      // console.log(headers)

      // Make a request to your server to perform the action with the JWT token
      const response = await axios.post('/api/add-to-cart', product,  {  headers: {
        Authorization: `Bearer ${token}`,
      }, } );

      if (response.status === 200) {
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error!');
    }
  };

  return <button onClick={addToCart}>Add to cart</button>;
};

AddToCartButton.propTypes = {
  product: PropTypes.object.isRequired,
};

export default AddToCartButton;



