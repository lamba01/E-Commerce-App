import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./orders.css"
import Loading from '../../Components/LoadingAnimation/Loading';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const apiUrl = 'https://app-chi-pink.vercel.app'; 
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          alert('You are not logged in. Please log in to see your order details.');
          navigate('/login')
          return;
        }
        const response = await axios.get(`${apiUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        navigate('/login')
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]); 

  return (
    <div className='order-header'>
      <h2 >Orders</h2>
      {loading && <div className="loo"><Loading /></div>}
      {!loading && !error && (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li className='listt' key={order.order_id}>
                  <img className='order-images' src={order.product_image} alt="" />
                  <div className="details"><p className='ordermain'>{order.product_name}</p>
                  <p className='ordermain'>Order {order.order_id}</p>
                  <div className="status">{order.status}</div>
                  <h6>{order.date}</h6></div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
