import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/Bestseller.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productsToShow, setProductsToShow] = useState(8);
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  useEffect(() => {
    // Fetch product data from an API or source
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
    setProductsToShow(8); // Reset to display 8 products when category changes
  };

  const loadMoreProducts = () => {
    const newProductsToShow = productsToShow + 8;
    setProductsToShow(newProductsToShow);
  };

  return (
    <div className="bestseller-container">
      <h1 className='bestseller-header'>Best Seller</h1>

      <span className="mobile-toggle-button" onClick={toggleButtons}>
         Categories
      </span>

      {/* Category filter buttons */}
      <div className={`category-button-div ${showButtons ? 'show' : 'hide'}`}>
      <button onClick={() => filterByCategory('all')} className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}>All</button>
      <button onClick={() => filterByCategory('electronics')} className={`category-button ${selectedCategory === 'electronics' ? 'active' : ''}`}>Electronics</button>
      <button onClick={() => filterByCategory("men's clothing")} className={`category-button ${selectedCategory === "men's clothing" ? 'active' : ''}`}>Men's Clothing</button>
      <button onClick={() => filterByCategory("women's clothing")} className={`category-button ${selectedCategory === "women's clothing" ? 'active' : ''}`}>Women's Clothing</button>
      <button onClick={() => filterByCategory("jewelery")} className={`category-button ${selectedCategory === "jewelery" ? 'active' : ''}`}>Jewelery</button>
      </div>

      {/* Products */}
      <div className="products-div">
        {filteredProducts.slice(0, productsToShow).map((product, index) => (
          <Link to={`/products/${product.id}`} className="product-card-link" key={product.id}>
       <div className="product-cards" key={product.id}><div className='img'>
      <img
        className="product--image"
        src={product.image}
        alt={product.name}
      /></div>
      <div className="product_info">
        <h4 className="product-name">{product.title}</h4>
        <div className="product__details">
          <p className="product_price">
           ${product.price}
          </p>
        </div>
      </div>
    </div> 
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {selectedCategory === 'all' && productsToShow < filteredProducts.length && (
        <button className="load-more-button" onClick={loadMoreProducts}>
          Load More
        </button>
      )}
    </div>
  );
}

export default ProductList;
