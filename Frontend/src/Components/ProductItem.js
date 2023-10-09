import React from "react";
import PropTypes from "prop-types";
import { stripHtml } from "string-strip-html";
import "../Styles/ProductItem.css";
import AddToCartButton from "./Addtocart";

const ProductItem = ({ product }) => {
  const { result } = stripHtml(product.description);
  console.log(product);

  return (
    <div className="product__card">
      <img
        className="product__image"
        src={product.image.url}
        alt={product.name}
      />
      <div className="product__info">
        <h4 className="product__name">{product.name}</h4>
        <p className="product__description">
          {/* product description stripped of html tags */}
          {result}
        </p>
        <div className="product__details">
          <p className="product__price">
            {product.price.formatted_with_symbol}
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object,
};

export default ProductItem;
