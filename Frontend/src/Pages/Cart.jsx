import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackBtn from '../Components/BackBtn';

function Cart() {
  const [cartDetails, setCartDetails] = useState([]);
  const mystyle = {
    width: '100px',
    height: '100px'
  }

  useEffect(() => {
    axios.get('/api/cart')
      .then((response) => {
        setCartDetails(response.data);
        // console.log(response.data.length)
      })
      .catch((error) => {
        console.error('Error fetching cart details:', error);
      });
  }, []);

  return (
    <div>
      <h1>Cart Details</h1>
      <ul>
        {cartDetails.map((item) => (
          <li key={item.cart_id}>
            Product: {item.product_name}, Price: ${item.price}, Quantity: {item.quantity}
            <img src={item.product_image} alt={item.product_name} style={mystyle} />
          </li>
        ))}
      </ul>
      <BackBtn />
    </div>
  );
}

export default Cart;



