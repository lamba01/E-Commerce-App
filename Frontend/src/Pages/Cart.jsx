import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackBtn from '../Components/BackBtn';
import DeleteCartItemButton from '../Components/DeleteCartItemBtn';

function Cart({ cartAmount, setCartAmount }) {
  const [cartDetails, setCartDetails] = useState([]);
  // const [CartAmount, setCartAmount] = useState([])
  const mystyle = {
    width: '100px',
    height: '100px',
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!token) {
      alert("pleae login!")
    }
    // Retrieve the JWT token from local storage or another storage mechanism
    axios
      .get('/api/cart', { headers: {
        Authorization: `Bearer ${token}`,
      }, })
      .then((response) => {
        setCartDetails(response.data);
        const newCartAmount = response.data.length;
        setCartAmount(newCartAmount)  
      })
      .catch((error) => {
        console.error('Error fetching cart details:', error);
      });
  });

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
            const newCartAmount = response.data.length;
            setCartAmount(newCartAmount)          
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
        {cartDetails.map((item) => {
          const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
  
          return (
            <li key={item.id}>
              <Link to={`/${item.route}/${item.product_id}`}>
                Product: {item.product_name}, Price: ${item.price}, Quantity: {productQuantity}
                <img src={item.product_image} alt={item.product_name} style={mystyle} />
              </Link>
              <DeleteCartItemButton cartItemId={item.id} onDelete={onDeleteCartItem} />
            </li>
          );
        })}
      </ul>
      <BackBtn />
    </div>
  );
}  

export default Cart;
