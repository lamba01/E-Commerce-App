import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../../Components/Addtocart';
import BackBtn from '../../Components/BackBtn';
import ProductQuantityControl from '../../Components/ProductQuantityControl';
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts"
import Loading from '../../Components/LoadingAnimation/Loading';
import "./productdetails.css"

function ProductDetails({ updateCartAmount }) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false); // Check if the product is in the cart
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setLoading(true);
    // Fetch product details using the productId
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
  }, [productId]);

  const token = localStorage.getItem('token');
  const apiUrl = 'https://app-chi-pink.vercel.app'; 
  // Function to check if the product is in the user's cart
  const checkIfInCart = async () => {
    try {
      // Ensure the token is defined
      if (!token) {
        console.error('Token is missing. Unable to check the cart.');
        return;
      }
  
      // Make the request to check the cart
      const response = await axios.get(`${apiUrl}/api/cart`, {
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
    // console.log('Product added to cart successfully');
  };

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  

  // Call the function to check if the product is in the cart
  useEffect(() => {
    checkIfInCart();
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  if (!product) {
    return <div className='loader'><Loading /></div>;
  }
  const selectedProductCategory = product.category;

  return (
    <div className='main'>
    <BackBtn />
    <div className='product-container'>  
    {loading ? (
            <div className='mobileee'><Loading /></div> // Display loading message or animation
          ) : (
            <>
            <div className='item1'><img src={product.image} className='product-details-image' alt={product.title} /></div>
      <div className='item2'>
      <h3>{product.title}</h3>
      <span className='product-details-price'>${product.price}</span>
      <p className='product-details-description'>{product.description}</p>
      
      {isInCart ? (
        <div>
          <p>Product is already in your cart</p>
          <ProductQuantityControl product={product}/>
        </div>
      ) : (
        <AddToCartButton product={product} onaddToCart={handleAddToCart} />
      )}
      </div> 
            </>
          )} 
    </div>
    <RelatedProducts selectedProductCategory={ selectedProductCategory} currentProductId={productId} scrollToTop={scrollToTop}/>
    </div>
  );
}

export default ProductDetails;



