import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import commerce from "../lib/Commerce";
import { useParams } from 'react-router-dom';
import AddToCartButton from '../Components/Addtocart';
import BackBtn from "../Components/BackBtn";


function ProductDs() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    commerce.products
      .retrieve(productId) // Fetch the product by its ID
      .then((retrievedProduct) => {
        setProduct(retrievedProduct);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <img src={product.image.url} alt={product.name} />
      <h2>{product.name}</h2>
      <p>Category: {product.categories[0].name}</p>
      <p>Price: {product.price.formatted_with_symbol}</p>
      <AddToCartButton product={product} />
      <BackBtn />
    </div>
  );
}

ProductDs.propTypes = {
  match: PropTypes.object,
};

export default ProductDs;
