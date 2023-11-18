import React from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import "./Products.css";

const ProductsList = ({ products }) => {
  return (
    <div className="products" id="products">
      {products.map((product) => (
        <Link
          to={`/product/${product.id}`} // Link to the product details page using the product's ID
          key={product.id}
          className="product-card-link"
        >
          <ProductItem product={product} />
        </Link>
      ))}
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.array,
};

export default ProductsList;
