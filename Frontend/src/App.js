// App.js or a separate routing component
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/Product Details/ProductDetails";
import ProductDetailss from "./Pages/Product Details/Productdits";
import Cart from "./Pages/Cart/Cart";
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
        <Route path="/signup" element={<SignUp />} />
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
