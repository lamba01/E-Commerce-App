import React, { useState, useEffect } from 'react';

const CartAmount = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Initial quantity is set to 1

  useEffect(() => {
    // Retrieve the product's quantity from local storage
    const storedQuantity = localStorage.getItem(`product_${product.id}_quantity`);
    if (storedQuantity) {
      setQuantity(parseInt(storedQuantity, 10));
    }
  }, [product]);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    // Store the updated quantity in local storage
    localStorage.setItem(`product_${product.id}_quantity`, newQuantity.toString());
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      // Store the updated quantity in local storage
      localStorage.setItem(`product_${product.id}_quantity`, newQuantity.toString());
    }
  };

  return (
    <div>
      <button onClick={decreaseQuantity}>-</button>
      <span>{quantity}</span>
      <button onClick={increaseQuantity}>+</button>
    </div>
  );
};

export default CartAmount;
