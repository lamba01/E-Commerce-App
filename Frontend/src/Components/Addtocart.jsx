import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddToCartButton = ({ product }) => {
  const addToCart = async () => {
    try {
      const response = await axios.post('/api/add-to-cart', product);
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
