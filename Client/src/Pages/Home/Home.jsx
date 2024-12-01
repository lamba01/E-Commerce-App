import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductSlider from "../../Components/Slider";
import BestSeller from "../../Components/BestSeller";
import PlaceHolders from "../../Components/PlaceHolders";
import Categories from "../../Components/Categories";
import FlashSales from "../../Components/FlashSales";
import Featured from "../../Components/Featured";
import './Home.css'

function Home() {
  const [commerceProducts, setCommerceProducts] = useState([]); // Change the variable name

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setCommerceProducts(response.data); 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  return (
    <div className="app">
      <ProductSlider products={commerceProducts} /> 
      <FlashSales />
      <Categories />
      <BestSeller />
      <Featured />
      <PlaceHolders />
    </div>
  );
}

export default Home;
