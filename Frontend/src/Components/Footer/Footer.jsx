import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer className="footer">
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
          <div className="social-links">
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"></a>
            <a href="#"> </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
