import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../Components/LoadingAnimation/Loading';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const apiUrl = 'https://app-chi-pink.vercel.app'; 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token) {
          alert("Please log in!");
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
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>Your Orders</h2>
      {loading && <Loading />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.order_id}>
                  {/* Display order information as needed */}
                  <p>Order ID: {order.order_id}</p>
                  <p>Order name: {order.product_name}</p>
                  {/* Add more details based on your data structure */}
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
