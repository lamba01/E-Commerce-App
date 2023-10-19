import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../../Components/Addtocart';
import BackBtn from '../../Components/BackBtn';
import ProductQuantityControl from '../../Components/ProductQuantityControl';
import RelatedProducts from "../../Components/RelatedProducts"
import "./productdetails.css"

function ProductDetails({ updateCartAmount }) {
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
  const selectedProductCategory = product.category;

  return (
    <div className='main'>
    <BackBtn />
    <div className='product-container'>   
      <div className='item1'><img src={product.image} className='product-details-image' alt={product.title} /></div>
      <div className='item2'>
      <h3>{product.title}</h3>
      <span className='product-details-price'>${product.price}</span>
      {/* <p>Category: {product.category}</p> */}
      <p className='product-details-description'>{product.description}</p>
      
      {isInCart ? (
        <div>
          <p>Product is already in your cart</p>
          {/* Include the logic for increasing and decreasing quantity here */}
          <ProductQuantityControl product={product}/>
        </div>
      ) : (
        <AddToCartButton product={product} onaddToCart={handleAddToCart} />
      )}
      <RelatedProducts selectedProductCategory={ selectedProductCategory}/>
      </div>
    </div>
    </div>
  );
}

export default ProductDetails;


