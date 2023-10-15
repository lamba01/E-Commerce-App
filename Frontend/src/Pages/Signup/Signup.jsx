import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./signup.css"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User signed up successfully
        console.log('User signed up successfully');
        // Redirect to a login page or perform other actions
      } else {
        // Handle sign-up errors
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='sign-form'>
      <div className="sign-form-container">
      <h2 className='headers'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='inputt'>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='inputt'>
          <label>Email address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='inputt'>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className='signin-btn'>Sign Up</button>
      </form>
      <p className="or">or</p>
      <Link to = {`/login`} className="btn-containerr">
        <button className="signup-btn" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
