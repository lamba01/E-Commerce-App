// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/Product Details/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop/Shop";
import Orders from "./Pages/Orders/Orders";
import About from "./Pages/About/About";
import ForgotPassword from "./Components/ResetPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

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
          path="/products/:productId"
          element={<ProductDetails updateCartAmount={updateCartAmount} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/cart"
          element={
            <Cart cartAmount={cartAmount} setCartAmount={updateCartAmount} />
          }
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
