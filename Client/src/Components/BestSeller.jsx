import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { Link } from 'react-router-dom';
import '../Styles/Bestseller.css';

function BestSellingProducts() {
  const products = useContext(ProductsContext);
  const [productsToShow, setProductsToShow] = useState(4);

  const loadMoreProducts = () => {
    setProductsToShow(productsToShow + 4); // Load 4 more products
  };

  return (
    <div className="bestseller-container">
      <div className="thismonth-container">
        <div className="thismonth-design"></div>
        <span className="thismonth-text">this month</span>
      </div>
      <div className="bestseller-header-container">
        <h1 className="bestseller-header">Best Selling products</h1>
        {productsToShow < products.length && (
          <button className="load-more-button" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
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
