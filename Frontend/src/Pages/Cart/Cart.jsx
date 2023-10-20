import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BackBtn from '../../Components/BackBtn';
import DeleteCartItemButton from '../../Components/DeleteCartItemBtn';
import "./cart.css"

function Cart({ cartAmount, setCartAmount }) {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Please log in!");
    }

    // Retrieve cart details from the server
    axios
      .get('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCartDetails(response.data);
        const newCartAmount = response.data.length;
        setCartAmount(newCartAmount);

        // Calculate the total for the cart
        const total = response.data.reduce((acc, item) => {
          const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
          return acc + item.price * productQuantity;
        }, 0);

        setCartTotal(total);
      })
      .catch((error) => {
        console.error('Error fetching cart details:', error);
      });
  }, [token, setCartAmount]);

  const onDeleteCartItem = (cartItemId) => {
    // Implement the logic to delete the cart item using an API request
    axios
      .delete(`/api/cart/${cartItemId}`)
      .then(() => {
        // Reload the cart data after deletion
        axios
          .get('/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setCartDetails(response.data);
            const newCartAmount = response.data.length;
            setCartAmount(newCartAmount);

            // Calculate the total for the cart after item deletion
            const total = response.data.reduce((acc, item) => {
              const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
              return acc + item.price * productQuantity;
            }, 0);

            setCartTotal(total);
          })
          .catch((error) => {
            console.error('Error fetching cart details after deletion:', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  };

  const updateCartItemQuantity = (cartItemId, newQuantity, productItemId) => {
    // Implement the logic to update the cart item quantity using an API request

    // Update the local storage as well
    localStorage.setItem(`product_${productItemId}_quantity`, newQuantity);

    // Recalculate the total
    const total = cartDetails.reduce((acc, item) => {
      const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
      return acc + item.price * productQuantity;
    }, 0);

    setCartTotal(total);
  };

  return (
    <div>
      <BackBtn />
      <div className='cart'>
        <h1>Cart Details</h1>
        <ul>
          {cartDetails.map((item) => {
            const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
            const itemTotal = item.price * productQuantity;
            const parsedQuantity = parseInt(productQuantity, 10);

            return (
              <li key={item.id}>
                  <div className='cart-item-container'>
                  <Link to={`/${item.route}/${item.product_id}`} className='link'>
                    <img src={item.product_image} className='cart-item-image' alt={item.product_name} /></Link>
                    <div className="sub-text">
                    <Link to={`/${item.route}/${item.product_id}`} className='link'>
                       <h4 className='cart-item-text'>{item.product_name}</h4> </Link>
                      <div className='sub-text-div'>
                        <span>Qty: {productQuantity}</span>
                        <p>${itemTotal}</p>
                      </div>
                      <button onClick={() => updateCartItemQuantity(item.id, parsedQuantity + 1, item.product_id)}>
                        Increase Quantity
                        </button>
                      <button onClick={() => updateCartItemQuantity(item.id, productQuantity > 1 ? parsedQuantity - 1 : 1, item.product_id)}>
                      Decrease Quantity
                      </button>
                    </div>
                    <DeleteCartItemButton cartItemId={item.id} onDelete={onDeleteCartItem} />
                  </div>
                
              </li>
            );
          })}
        </ul>
        <p>Total: ${cartTotal.toFixed(2)}</p>
        <BackBtn />
      </div>
    </div>
  );
}

export default Cart;
