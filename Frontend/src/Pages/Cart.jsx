// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BackBtn from '../Components/BackBtn';

// function Cart() {
//   const [cartDetails, setCartDetails] = useState([]);
//   const mystyle = {
//     width: '100px',
//     height: '100px'
//   }

//   useEffect(() => {
//     axios.get('/api/cart')
//       .then((response) => {
//         setCartDetails(response.data);
//         // console.log(response.data.length)
//       })
//       .catch((error) => {
//         console.error('Error fetching cart details:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Cart Details</h1>
//       <ul>
//         {cartDetails.map((item) => (
//           <li key={item.cart_id}>
//             Product: {item.product_name}, Price: ${item.price}, Quantity: {item.quantity}
//             <img src={item.product_image} alt={item.product_name} style={mystyle} />
//           </li>
//         ))}
//       </ul>
//       <BackBtn />
//     </div>
//   );
// }

// export default Cart;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BackBtn from '../Components/BackBtn';
// import DeleteCartItemButton from '../Components/DeleteCartItemBtn';

// function Cart() {
//   const [cartDetails, setCartDetails] = useState([]);
//   const mystyle = {
//     width: '100px',
//     height: '100px',
//   };

//   useEffect(() => {
//     axios
//       .get('/api/cart')
//       .then((response) => {
//         setCartDetails(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching cart details:', error);
//       });
//   }, []);

//   const onDeleteCartItem = (cartItemId) => {
//     // Implement the logic to delete the cart item using an API request
//     axios
//       .delete(`/api/cart/${cartItemId}`)
//       .then(() => {
//         // Reload the cart data after deletion
//         axios
//           .get('/api/cart')
//           .then((response) => {
//             setCartDetails(response.data);
//           })
//           .catch((error) => {
//             console.error('Error fetching cart details after deletion:', error);
//           });
//       })
//       .catch((error) => {
//         console.error('Error deleting cart item:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Cart Details</h1>
//       <ul>
//         {cartDetails.map((item) => (
//           <li key={item.id}>
//             Product: {item.product_name}, Price: ${item.price}, Quantity: {item.quantity}
//             <img src={item.product_image} alt={item.product_name} style={mystyle} />
//             <DeleteCartItemButton cartItemId={item.id} onDelete={onDeleteCartItem} />
//           </li>
//         ))}
//       </ul>
//       <BackBtn />
//     </div>
//   );
// }

// export default Cart;




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
     // Adjust this based on how you've stored the token

    // Define the headers with the Authorization header
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };

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
          }, }) // Include headers here as well
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