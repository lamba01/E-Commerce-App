import React from 'react';
import { useLocation  } from 'react-router-dom';
import { BiLogoFacebook } from 'react-icons/bi'
import { RiTwitterXFill } from 'react-icons/ri'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import "./footer.css"

const Footer = () => {
    const location = useLocation();

  const pathsToHideNavbar = ["/login", "/Signup"];

  // Check if the current path is in the array of paths to hide the navbar
  const hideNavbar = pathsToHideNavbar.includes(location.pathname);
  return (
    <div>{!hideNavbar && (<footer className="footer">
      <div className="container row">
        <div className="footer-col">
          <h4>company</h4>
          <ul>
            <li>about us</li>
            <li>our services</li>
            <li>privacy policy</li>
            <li>visit website</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>get help</h4>
          <ul>
            <li>FAQ</li>
            <li>shipping</li>
            <li>returns</li>
            <li>order status</li>
            <li>payment options</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>online shop</h4>
          <ul>
            <li>download</li>
            <li>changelog</li>
            <li>github</li>
            <li>all version</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>follow us</h4>
          {newFunction()}
        </div>
      </div>
    </footer>)}
    </div>
  );

  function newFunction() {
    return <div className="social-links">
      <a href="https://www.facebook.com/profile.php?id=61553319431267&mibextid=ZbWKwL">
        <div><BiLogoFacebook /></div>
        </a>
      <a href="https://www.twitter.com/lambacodes">
        <div><RiTwitterXFill /></div>
        </a>
        <a href="https://instagram.com/la.mba7006?igshid=NzZlODBkYWE4Ng==">
          <div><AiOutlineInstagram /></div>
          </a>
          <a href="https://www.linkedin.com/in/john-moyinoluwa-720585243">
            <div><FaLinkedinIn /></div>
            </a>
    </div>;
  }
};

export default Footer;
