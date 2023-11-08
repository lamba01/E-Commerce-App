import React from 'react'
import { Link, useLocation  } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'
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
      <li className ="mobilelogo">Logos</li>
       <Link to={`/`} style={{ textDecoration: 'none', textTransform: 'none', color: 'none'}}> <li className='home'>Home</li></Link>
      <Link to={`/cart`} className='desktop-cart'><li><AiOutlineShoppingCart size={'1.5em'}  /> <div className='cartamount'>{cartAmount}</div></li></Link>
        <li>Sign-In</li>
        <li>Shop</li>
      </ul>
      <h1 className ="logo">Logos</h1>
      <Link to={`/cart`} className='mobile-cart'><AiOutlineShoppingCart size={'2em'}  /><div className='cartamount'>{cartAmount}</div></Link>
    </div>
  </nav>)}</div>
  )
}

export default Navigation