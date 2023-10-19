import React, { useEffect, useState } from 'react';

function RelatedProducts({ selectedProductCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from an API or source
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Filter products based on the selected category
        const filteredProducts = data.filter((product) => product.category === selectedProductCategory);
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [selectedProductCategory]);

  return (
    <div>
      <h2>Similar Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          <div className="product__info">
            <h4 className="product__name">{product.title}</h4>
            <p className="product__description">{product.category}</p>
            <div className="product__details">
              <p className="product__price">${product.price}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RelatedProducts;

