import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RelatedProduct.css'

function RelatedProducts({ selectedProductCategory, currentProductId }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch product data from an API or source
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Filter products based on the selected category
        const filteredProducts = data.filter((product) => product.category === selectedProductCategory
        && product.id !== Number(currentProductId));
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [selectedProductCategory, currentProductId]);

  return (
    <div className='related-product'>
    <h2>Similar Products</h2>
    <div className='related-product-main'>
      {products.map((product) => (
        <div className='related-prod' key={product.id}>
           <Link to={`/products/${product.id}`} className='related-product-sub-container' > 
          <div className='image'><img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          </div>
          <div>
            <p className="product__name">{product.title}</p>
              <span className="related-product-price">${product.price}</span>
          </div>
          </Link>
        </div>  
      ))}
    </div>
    </div>
  );
}

export default RelatedProducts;

