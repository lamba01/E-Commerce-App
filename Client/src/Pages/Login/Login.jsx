import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./login.css"


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const apiUrl = 'https://app-chi-pink.vercel.app'; 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/api/login`, formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
  
        // Successful login, redirect or perform desired action
        console.log("Login successful");
        // Redirect or perform actions here (e.g., set user state, navigate to dashboard)
        navigate('/')
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="form">
      <div className="form-container">
      <h2 className="header">Sign In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>Email address<span>*</span></label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label>Password<span>*</span></label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="pass">
        <div>    
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe" 
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label htmlFor="remember me">Remember me</label></div>
          <p>Lost your password?</p>
        </div>
        <button className="submit-btn" type="submit">Sign In</button>
      </form>
      <div class="separator">
      <div class="line"></div>
      <p>or</p>
      <div class="line"></div>
      </div>
      
      <Link to = {`/Signup`} className="btn-container">
        <button className="signup-btn" type="submit">Create an account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login


