import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RelatedProduct.css'
import commerce from "../../lib/Commerce";


function ProductCategoryList({ selectedCategory, currentProductId }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        // Filter products based on the selected category
        const filteredProduct = products.data.filter((product) => product.categories[0]?.name === selectedCategory
         && product.id !== currentProductId);
        setProducts(filteredProduct);  
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  return (
    <div className='related-product2'>
    <h2>Similar Products</h2>
    <div className='related-product-main'>
      {products.map((product) => (
        <div key={product.id}>
           <Link to={`/product/${product.id}`} className='related-product-sub-container' > 
          <div className='image2'>
            <img
            className="producttt-image"
            src={product.image.url}
            alt={product.name}
          />
          </div>
          <div>
            <p className="product__name">{product.name}</p>
              <span className="related-product-price">{product.price.formatted_with_symbol}</span>
          </div>
          </Link>
        </div>  
      ))}
    </div>
    </div>
  );
}

export default ProductCategoryList;
