import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/Bestseller.css';

function BestSellingProducts() {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(4);

  useEffect(() => {
    // Fetch product data from an API or source
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const loadMoreProducts = () => {
    const newProductsToShow = productsToShow + 4; // Load 4 more products
    setProductsToShow(newProductsToShow);
  };

  return (
    <div className="bestseller-container">
      <div className='thismonth-container'>
        <div className="thismonth-design"></div>
        <span className='thismonth-text'>this month</span>
      </div>
    <div className='bestseller-header-container'>
      <h1 className="bestseller-header">Best Selling products</h1>
      {/* Load More Button */}
       {productsToShow < products.length && (
        <button className="load-more-button" onClick={loadMoreProducts}>
          Load More
        </button>
      )}
      </div>
      {/* Products */}
      <div className="products-div">
        {products.slice(0, productsToShow).map((product) => (
          <Link to={`/products/${product.id}`} className="product-card-link" key={product.id}>
            <div className="product-cards">
              <div className="img">
                <img className="product--image" src={product.image} alt={product.title} />
              </div>
              <div className="product_info">
                <h4 className="product-name">{product.title}</h4>
                <div className="product__details">
                  <p className="product_price">${product.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BestSellingProducts;

