// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
// import AddToCartButton from '../Components/Addtocart';
// import BackBtn from '../Components/BackBtn';
// import CartAmount from '../Components/CartAmount';


// function ProductDetails() {
//   const { productId } = useParams(); // Get the productId from URL
//   const [product, setProduct] = useState(null);


//   useEffect(() => {
//     // Fetch product details using the productId
//     axios
//       .get(`https://fakestoreapi.com/products/${productId}`)
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, [productId]);


//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Product Details</h1>
//       <BackBtn />
//       <img src={product.image} alt={product.title} />
//       <h2>{product.title}</h2>
//       <p>Category: {product.category}</p>
//       <p>Price: ${product.price}</p>
//       <CartAmount />
//       <AddToCartButton product={product} />
//       {/* Add more details as needed */}
//     </div>
//   );
// }

// export default ProductDetails;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../Components/Addtocart';
import BackBtn from '../Components/BackBtn';
import CartAmount from '../Components/CartAmount';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // Check if the product is in the cart

  useEffect(() => {
    // Fetch product details using the productId
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [productId]);
  const token = localStorage.getItem('token');
  // Function to check if the product is in the user's cart
  const checkIfInCart = async () => {
    try {
      // Ensure the token is defined
      if (!token) {
        console.error('Token is missing. Unable to check the cart.');
        return;
      }
  
      // Make the request to check the cart
      const response = await axios.get('/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Log the response for debugging
      console.log('Cart Check Response:', response);
  
      if (response.status === 200) {
        const cartItems = response.data;
        const productIsInCart = cartItems.some((item) => item.product_name === product.title);
        setIsInCart(productIsInCart);
      } else {
        console.error('Error checking cart. Unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  };
  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart here...

    // After adding the product, set the isInCart state to true and update the quantity
    setIsInCart(true);// You can adjust the initial quantity if needed
    checkIfInCart();

    // Display any success message if needed
    console.log('Product added to cart successfully');
  };
  

  // Call the function to check if the product is in the cart
  useEffect(() => {
    checkIfInCart();
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <BackBtn />
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <CartAmount />
      {isInCart ? (
        <div>
          {/* Display quantity controls or any other UI if the product is in the cart */}
          <p>Product is already in your cart</p>
          {/* Include the logic for increasing and decreasing quantity here */}
        </div>
      ) : (
        <AddToCartButton product={product} onaddToCart={handleAddToCart}/>
      )}
    </div>
  );
}

export default ProductDetails;



