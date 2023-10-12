// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import commerce from "./lib/Commerce";
// import ProductsList from "./Components/ProductsList";
// import ProductSlider from "./Components/Slider";
// // import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navigation from "./Components/Navigation";
// import Products from "./Components/Products";
// // import Test from "./Components/Test";
// // import Login from "./Components/Login";
// // import SignUp from "./Components/Signup";
// // import Cart from "./Components/Cart";
// // import { Router } from "react-router-dom";
// // import ProductDetails from "./Components/ProductDetails";
// // import object from "prop-types";

// const App = () => {
//   const [commerceProducts, setCommerceProducts] = useState([]); // Change the variable name

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((response) => {
//         setCommerceProducts(response.data); // Change the variable name here as well
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   }, []);

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
//       {/* <Navigation /> */}
//       {/* <ProductSlider products={commerceProducts} /> */}
//       {/* <Login /> */}
//       {/* <ProductDetails /> */}
//       {/* <Cart /> */}
//       {/* <SignUp /> */}
//       <ProductsList products={products} />
//       <Products />
//       <Test />
//     </div>
//   );
// };

// export default App;

// App.js or a separate routing component
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import ProductDetailss from "./Pages/Productdits";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetailss />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
