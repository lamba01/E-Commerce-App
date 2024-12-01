import React from 'react'
import '../Styles/Featured.css';
import Psimage from '../images/ps5-slim.png'
import Women from "../images/women's-collection.png"
import Speakers from '../images/Frame 707.png'
import Perfume from '../images/perfume.png'
import { Link } from 'react-router-dom';

function Featured() {
  return (
    <main className='featured-container'>
        <div className="thismonth-container">
            <div className="thismonth-design"></div>
            <span className="thismonth-text">featured</span>
        </div>
        <h2 className="featured-header">new arrivals</h2>
        <div className="grid-container">
            <div className="featured-grid-item1">
                <div className="featured-text1">
                    <h3>PlayStation 5</h3>
                    <p>Black and White versions of the PS5 coming on sale</p>
                    <Link to={'/shop'}><button className='featured-btn'>shop now</button></Link>
                </div>
                <img className='featured-image1' src={Psimage} alt="ps5 slim" />
            </div>
            <div className="other-items">
            <div className="featured-grid-item2">
                <div className="featured-text2">
                    <h3>women's collections</h3>
                    <p>Featured woman collection that gives you another vibe</p>
                    <Link to={'/shop'}><button className='featured-btn'>shop now</button></Link>
                </div>
                <img className='featured-image2' src={Women} alt="attractive woman" />
            </div>
            <div className="bottom-items">
            <div className='featured-grid-item3'>
                <div className="featured-text3">
                    <h3>speakers</h3>
                    <p>Amazon wireless speakers</p>
                    <Link to={'/shop'}><button className='featured-btn'>shop now</button></Link>
                </div>
                <img className='featured-image3' src={Speakers} alt="some speakers" />
            </div>
            <div  className="featured-grid-item4">
                <div className="featured-text3">
                    <h3>perfume</h3>
                    <p>GUCCI INTENSE OUD EUD</p>
                    <Link to={'/shop'}><button className='featured-btn'>shop now</button></Link>
                </div>
                <img className='featured-image4' src={Perfume} alt="perfumes for sale" />
            </div>
            </div>
            </div>
        </div>
    </main>
  )
}

export default Featured