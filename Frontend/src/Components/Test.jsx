import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to show all products

  useEffect(() => {
    // Fetch product data from an API or source
    axios.get('https://fakestoreapi.com/products')
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
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered); // Show products in the selected category
    }
    setSelectedCategory(category); // Update the selected category
  };

  return (
    <div>
      <h1>Product List</h1>
      
      {/* Category filter buttons */}
      <div>
      <button onClick={() => filterByCategory('all')} className={selectedCategory === 'all' ? 'active' : ''}>All</button>
      <button onClick={() => filterByCategory('electronics')} className={selectedCategory === 'electronics' ? 'active' : ''}>Electronics</button>
      <button onClick={() => filterByCategory("men's clothing")} className={selectedCategory === "men's clothing" ? 'active' : ''}>Men's Clothing</button>
      <button onClick={() => filterByCategory("women's clothing")} className={selectedCategory === "women's clothing" ? 'active' : ''}>Women's Clothing</button>
      <button onClick={() => filterByCategory("jewelery")} className={selectedCategory === "jewelery" ? 'active' : ''}>jewelery</button>
        {/* Add more buttons for other categories */}
      </div>
      
      {/* <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title}: ${product.price} " "
            {product.id}
          </li>
        ))}
      </ul> */}
      <div>
        {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
      />
      <div className="product__info">
        <h4 className="product__name">{product.title}</h4>
        <p className="product__description">
          {product.category}
        </p>
        <div className="product__details">
          <p className="product__price">
           ${product.price}
          </p>
        </div>
      </div>
    </div>          
        ))}
    </div>
    </div>
  );
}

export default ProductList;
