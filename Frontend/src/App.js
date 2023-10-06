import React, { useState, useEffect } from "react";
import axios from "axios";
import commerce from "./lib/Commerce";
import ProductsList from "./Components/ProductsList";
import ProductSlider from "./Components/Slider";
import Navigation from "./Components/Navigation";
import Products from "./Components/Products";
import Test from "./Components/Test";
// import object from "prop-types";

const App = () => {
  const [commerceProducts, setCommerceProducts] = useState([]); // Change the variable name

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setCommerceProducts(response.data); // Change the variable name here as well
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };
  return (
    <div className="app">
      <Navigation />
      <ProductSlider products={commerceProducts} />
      <ProductsList products={products} />
      <Products />
      <Test />
    </div>
  );
};

export default App;
