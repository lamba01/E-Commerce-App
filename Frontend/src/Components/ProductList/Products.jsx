import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

function Products({ searchQuery }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <h1>Product List</h1>
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.id} >
          <Link to={`/products/${product.id}`} className="product-card-link">
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product__info">
              <h4 className="product__name">{product.title}</h4>
              <p className="product__description">{product.category}</p>
              <div className="product__details">
                <p className="product__price">${product.price}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Products;


