import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillCaretRight, AiFillCaretLeft, AiOutlineClose } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'
import BackBtn from '../../Components/BackBtn';
import DeleteCartItemButton from '../../Components/DeleteCartItemBtn';
import PaymentSimulation from '../../Components/PaymentSimulation/Payment';
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

  const onDeleteCartItem = (cartItemId, product_id) => {
    // Implement the logic to delete the cart item using an API request
    // Remove the product quantity from local storage
    localStorage.removeItem(`product_${product_id}_quantity`);
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
  const navigate = useNavigate();
  const goBackToShop = () => {
    navigate('/'); // Use navigate to go back to the product list
  };
  const isCartEmpty = cartDetails.length === 0;

  return (
    <div>
    {isCartEmpty ? (
      <div className='empty-cart-container'>
        <div className='closee'><AiOutlineClose /></div>
        <p>Your cart is currently empty</p>
        <button className='emptycartbtn'onClick={goBackToShop}>Return to shop</button>
      </div>
    ) : (
    <div className='parent'>
      <PaymentSimulation />
      <BackBtn />
      
      <div className='cartpage'>
        <div className="mobile-checkout">
        <h4>Cart Summary</h4>
        <div>
          <p>subtotal</p><p> ${cartTotal.toFixed(2)}</p>
        </div>
        <h4 className='mobile-header'>Shopping Cart({cartAmount})</h4> 
        </div>
      <div className='cart'>
      <h4 className='header'>Shopping Cart({cartAmount})</h4> 
        <ul>
          {cartDetails.map((item) => {
            const productQuantity = localStorage.getItem(`product_${item.product_id}_quantity`) || 1;
            const itemTotal = item.price * productQuantity;
            const parsedQuantity = parseInt(productQuantity, 10);

            return (
              <li key={item.id} className='list'>
                  <div className='cart-item-container'>
                  <Link to={`/${item.route}/${item.product_id}`} className='link'>
                    <img src={item.product_image} className='cart-item-image' alt={item.product_name} /></Link>
                    <div className="sub-text">
                    <Link to={`/${item.route}/${item.product_id}`} className='link'>
                       <h4 className='cart-item-text'>{item.product_name}</h4> </Link>
                      <div className='sub-text-div'>
                        <div className='quantity'>
                        <AiFillCaretLeft className='icon' onClick={() => updateCartItemQuantity(item.id, productQuantity > 1 ? parsedQuantity - 1 : 1, item.product_id)}/>
                        {productQuantity}
                        <AiFillCaretRight className='icon' onClick={() => updateCartItemQuantity(item.id, parsedQuantity + 1, item.product_id)}/>
                        </div>
                        <p>${itemTotal.toFixed(1)}</p>
                      </div>
                    </div>
                    <DeleteCartItemButton cartItemId={item.id} product_id={item.product_id} onDelete={onDeleteCartItem} />
                  </div>
                
              </li>
            );
          })}
        </ul>
      </div>
      <div className="checkout">
        <h4>Cart Summary</h4>
        <div>
          <p>subtotal</p><p> ${cartTotal.toFixed(2)}</p>
        </div>
        <button className='checkout-btn'>${cartTotal.toFixed(2)}<span>Checkout <BsArrowRight /></span></button>
      </div>
      </div>
    </div>)}
    </div>
  );
}

export default Cart;
