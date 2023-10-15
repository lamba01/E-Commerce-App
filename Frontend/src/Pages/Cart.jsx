import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackBtn from '../Components/BackBtn';
import DeleteCartItemButton from '../Components/DeleteCartItemBtn';

function Cart() {
  const [cartDetails, setCartDetails] = useState([]);
  const mystyle = {
    width: '100px',
    height: '100px',
  };
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Retrieve the JWT token from local storage or another storage mechanism
    axios
      .get('/api/cart', { headers: {
        Authorization: `Bearer ${token}`,
      }, })
      .then((response) => {
        setCartDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart details:', error);
      });
  }, [token]);

  const onDeleteCartItem = (cartItemId) => {
    // Implement the logic to delete the cart item using an API request
    axios
      .delete(`/api/cart/${cartItemId}`)
      .then(() => {
        // Reload the cart data after deletion
        axios
          .get('/api/cart', { headers: {
            Authorization: `Bearer ${token}`,
          }, }) 
          .then((response) => {
            setCartDetails(response.data);
          })
          .catch((error) => {
            console.error('Error fetching cart details after deletion:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  };

  return (
    <div>
      <h1>Cart Details</h1>
      <ul>
        {cartDetails.map((item) => (
          <li key={item.id}>
            Product: {item.product_name}, Price: ${item.price}, Quantity: {item.quantity}
            <img src={item.product_image} alt={item.product_name} style={mystyle} />
            <DeleteCartItemButton cartItemId={item.id} onDelete={onDeleteCartItem} />
          </li>
        ))}
      </ul>
      <BackBtn />
    </div>
  );
}

export default Cart;
