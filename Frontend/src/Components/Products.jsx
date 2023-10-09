import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Products.css';
import AddToCartButton from './Addtocart';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // const addToCart = async (product) => {
  //   try {
  //     const response = await axios.post('/api/add-to-cart', product);
  //     if (response.status === 200) {
  //       alert('Product added successfully');
  //     }
  //   } catch (error) {
  //     console.error('Error adding product to cart:', error);
  //     alert('Error!');
  //   }
  // };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product__info">
            <h4 className="product__name">{product.title}</h4>
            <p className="product__description">{product.category}</p>
            <div className="product__details">
              <p className="product__price">${product.price}</p>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;


// export default ProductList;

