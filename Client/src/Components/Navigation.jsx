import React from 'react'
import { Link, useLocation  } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import "../Styles/Navigation.css"
import logoImage from '../images/2.png';

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
       <Link to={`/`} style={{ textDecoration: 'none', textTransform: 'none', color: 'black'}}> <li className='home'>Home</li></Link>
      <Link to={'/Login'} style={{ textDecoration: 'none', textTransform: 'none', color: 'black'}}><li>Sign-In</li></Link>
      <Link to={'/orders'} style={{ textDecoration: 'none', textTransform: 'none', color: 'black'}}> <li>Orders</li> </Link>
       <Link to={'/shop'} style={{ textDecoration: 'none', textTransform: 'none', color: 'black'}}> <li>Shop</li> </Link>
       <Link to={`/cart`} className='desktop-cart'><li><AiOutlineShoppingCart size={'1.5em'}  /> <div className='cartamount'>{cartAmount}</div></li></Link>
      </ul>
      <Link to={`/`} style={{ textDecoration: 'none', textTransform: 'none', color: 'black'}}> <div className="logo-container"><h4>ShopEase</h4><img className='logo' src={logoImage} alt="" /></div> </Link>
      <Link to={`/cart`} className='mobile-cart'><AiOutlineShoppingCart size={'2em'}  />{cartAmount > 0 && <div className='cartamount'>{cartAmount}</div>}</Link>
    </div>
  </nav>)}</div>
  )
}

export default Navigation