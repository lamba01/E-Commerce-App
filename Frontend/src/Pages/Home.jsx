import React, { useState, useEffect } from "react";
// import axios from "axios";
import commerce from "../lib/Commerce";
import ProductsList from "../Components/ProductsList";
// import ProductSlider from "../Components/Slider";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navigation from "../Components/Navigation";
import Products from "../Components/Products";
import Test from "../Components/Test";
import PaymentSimulation from "../Components/PaymentSimulation/Payment";
// import Cart from "./Cart";
// import { Router } from "react-router-dom";
// import ProductDetails from "./ProductDetails";
// import object from "prop-types";

// function Home() {
//   const [commerceProducts, setCommerceProducts] = useState([]); // Change the variable name

//   // useEffect(() => {
//   //   axios
//   //     .get("https://fakestoreapi.com/products")
//   //     .then((response) => {
//   //       setCommerceProducts(response.data); // Change the variable name here as well
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error:", error);
//   //     });
//   // }, []);

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = () => {
//     commerce.products
//       .list()
//       .then((products) => {
//         setProducts(products.data);
//       })
//       .catch((error) => {
//         console.log("There was an error fetching the products", error);
//       });
//   };
//   return (
//     <div className="app">
//       <Navigation />
//       {/* <ProductSlider products={commerceProducts} /> */}
//       {/* <Login /> */}
//       {/* <ProductDetails /> */}
//       {/* <Cart /> */}
      // {/* <SignUp /> */}
//       <ProductsList products={products} />
//       <Products />
//       {/* <Test /> */}
//     </div>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from 'react';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
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

  // Filter products based on the search query
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <PaymentSimulation />
      <Test />
      <Products searchQuery={searchQuery} />
      <ProductsList searchQuery={searchQuery} products={filteredProducts} /> 
    </div>
  );
}

export default Home;
