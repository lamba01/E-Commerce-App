import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import commerce from "../lib/Commerce";
import axios from "axios";
import { useParams } from 'react-router-dom';
import AddToCartButton from '../Components/Addtocart';
import BackBtn from "../Components/BackBtn";
// import CartAmount from "../Components/CartAmount";



function ProductDs() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    commerce.products
      .retrieve(productId) // Fetch the product by its ID
      .then((retrievedProduct) => {
        setProduct(retrievedProduct);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
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
  
      if (response.status === 200) {
        const cartItems = response.data;
        const productIsInCart = cartItems.some((item) => item.product_id === productId);
        setIsInCart(productIsInCart);
      } else {
        console.error('Error checking cart. Unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  };
  const handleAddToCart = () => {
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
      <img src={product.image.url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Category: {product.categories[0]?.name}</p>
      <p>Price: {product.price.formatted_with_symbol}</p>
      <BackBtn />
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

ProductDs.propTypes = {
  match: PropTypes.object,
};

export default ProductDs;
