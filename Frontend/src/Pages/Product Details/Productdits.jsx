import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import commerce from "../../lib/Commerce";
import { stripHtml } from "string-strip-html";
import axios from "axios";
import { useParams } from 'react-router-dom';
import AddToCartButton from '../../Components/Addtocart';
import BackBtn from "../../Components/BackBtn";
import ProductQuantityControl from '../../Components/ProductQuantityControl';
import "./productdetails.css"

function ProductDs({ updateCartAmount }) {
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
        const newCartAmount = cartItems.length;
        updateCartAmount(newCartAmount);
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
  });


  if (!product) {
    return <div>Loading...</div>;
  }
  const { result } = stripHtml(product.description);

  return (
    <div className='main2'>
      <BackBtn />
    <div className='product-container2'>
    <div className='item1'><img src={product.image.url} className='product-details-image' alt={product.name} /></div>
    <div className='item2'>
      <h3>{product.name}</h3>
      <span className='product-details-price'>{product.price.formatted_with_symbol}</span>
      {/* <p>Category: {product.categories[0]?.name}</p> */}
      <p className='product-details-description'>{result}</p>
      {isInCart ? (
        <div>
          <p>Product is already in your cart</p>
          {/* Include the logic for increasing and decreasing quantity here */}
          <ProductQuantityControl product={product}/>
        </div>
      ) : (
        <AddToCartButton product={product} onaddToCart={handleAddToCart}/>
      )}
      </div>
    </div>
    </div>
  );
}

ProductDs.propTypes = {
  match: PropTypes.object,
};

export default ProductDs;
