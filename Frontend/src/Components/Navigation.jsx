import React from 'react'
import { Link, useLocation  } from 'react-router-dom';
import "../Styles/Navigation.css"

function Navigation({  cartAmount }) {
  const location = useLocation();

  const pathsToHideNavbar = ["/login", "/Signup"];

  // Check if the current path is in the array of paths to hide the navbar
  const hideNavbar = pathsToHideNavbar.includes(location.pathname);

  // setCart({ CartAmount })
  return (
    <div> {!hideNavbar && (<nav className="navbar">
    <div className="navbar-container containerr">
      <input type="checkbox" name="" id="" />
      <div className="hamburger-lines">
        <span className="line line1"></span>
        <span className="line line2"></span>
        <span className="line line3"></span>
      </div>
      <ul className ="menu-items">
      <Link to={`/cart`} className="product-card-link"><li>cart</li></Link>
        <li>Sign-In</li>
        <li><p>Number of items in cart: {cartAmount}</p></li>
      </ul>
      <h1 className ="logo">Logos</h1>
      <h1 className='logo'>Cart</h1>
    </div>
  </nav>)}</div>
  )
}

export default Navigation