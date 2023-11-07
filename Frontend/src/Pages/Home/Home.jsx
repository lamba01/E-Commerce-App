import React, { useState, useEffect } from "react";
import axios from "axios";
import commerce from "../../lib/Commerce";
import ProductsList from "../../Components/ProductsList";
import ProductSlider from "../../Components/Slider";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navigation from "../Components/Navigation";
import Products from "../../Components/Products";
import Test from "../../Components/BestSeller";
import PlaceHolders from "../../Components/PlaceHolders";
import './Home.css'

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
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

  // Filter products based on the search query
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="app">
      <ProductSlider products={commerceProducts} /> 
      <Test />
      {/* <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
      <PlaceHolders />
      {/* <Products searchQuery={searchQuery} />
      <ProductsList searchQuery={searchQuery} products={filteredProducts} />  */}
    </div>
  );
}

export default Home;
