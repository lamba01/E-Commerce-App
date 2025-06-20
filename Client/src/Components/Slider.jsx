import React, { useState, useEffect } from 'react';
import "../Styles/Slider.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ProductSlider({ products, scrollToTop  }) {
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Filter the first product from each category
    const firstProducts = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = product;
      }
      return acc;
    }, {});

    // Convert the filtered products to an array
    const firstProductsArray = Object.values(firstProducts);

    // Set the categoryProducts state
    setCategoryProducts(firstProductsArray);
  }, [products]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <Slider {...settings}>
      {categoryProducts.map((product) => (
        <div key={product.id} className="slider">
          <div className="product_card">
            <img
              className="slider-product__image"
              src={product.image}
              alt={product.title}
            />
            <div className="productinfo">
              <h2 className="product__names">{product.title}</h2>
              <p className="product__category">{product.category}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default ProductSlider;
