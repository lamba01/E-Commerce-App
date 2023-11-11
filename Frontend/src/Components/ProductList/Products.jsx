import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Products.css';

function Products({ searchQuery, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('Selected Category:', selectedCategory);
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') {
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.category === selectedCategory
      );
    }
  });

  return (
    <div className='productslisttt'>
      {filteredProducts.map((product) => (
        <div className="product-card" key={product.id}>
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
