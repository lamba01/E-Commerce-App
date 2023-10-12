import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import AddToCartButton from '../Components/Addtocart';
import BackBtn from '../Components/BackBtn';
import CartAmount from '../Components/CartAmount';


function ProductDetails() {
  const { productId } = useParams(); // Get the productId from URL
  const [product, setProduct] = useState(null);


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
      <AddToCartButton product={product} />
      {/* Add more details as needed */}
    </div>
  );
}

export default ProductDetails;





