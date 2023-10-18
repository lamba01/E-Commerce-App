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
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import ProductDetailss from "./Pages/Productdits";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Navigation from "./Components/Navigation";

function App() {
  // Retrieve the cartAmount value from localStorage when the component loads
  const storedCartAmount = localStorage.getItem("cartAmount");
  const [cartAmount, setCartAmount] = useState(
    storedCartAmount ? parseInt(storedCartAmount) : 0
  );

  // Define a function to update cartAmount when the cart is updated
  const updateCartAmount = (newAmount) => {
    setCartAmount(newAmount);
    // Update localStorage with the new cartAmount value
    localStorage.setItem("cartAmount", newAmount.toString());
  };
  return (
    <Router>
      <Navigation cartAmount={cartAmount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/product/:productId"
          element={<ProductDetailss updateCartAmount={updateCartAmount} />}
        />
        <Route
          path="/products/:productId"
          element={<ProductDetails updateCartAmount={updateCartAmount} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route
          path="/cart"
          element={
            <Cart cartAmount={cartAmount} setCartAmount={updateCartAmount} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
