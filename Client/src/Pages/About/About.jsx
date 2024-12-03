import React from 'react'
import Side from '../../images/Side Image.png'
import PlaceHolders from '../../Components/PlaceHolders'
import { CiShop } from "react-icons/ci";
import { AiOutlineDollar } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import { TbBasketDollar } from "react-icons/tb";
import Tom from '../../images/Frame 874.png'
import Emma from '../../images/Frame 875.png'
import Will from '../../images/Frame 876.png'
import './about.css'

function About() {
  return (
    <main className='about-container'>
        <div className="about-hero">
            <div className='about-hero-text'>
                <h1 className='about-header'>our story</h1>
                <p>Launched in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active
                    presense in Bangladesh. Supported by wide range of tailored marketing, data and service
                    solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.</p>
                <p>Exclusive has more than 1 Million products to offer, growing at a very fast. 
                    Exclusive offers a diverse assotment in categories ranging from consumer.</p>
            </div>
            <img className='about-hero-img' src={Side} alt="hero" />
        </div>
            <div className="achievement">
                <div className='achievement-div'>
                    <div className="about-icon-container">
                        <CiShop size={'2em'} color='white' /> 
                    </div>
                    <div>
                        <h3>10.5k</h3>
                        <p>Sellers active on our site</p>
                    </div>
                </div>
                <div className='achievement-div'>
                    <div className="about-icon-container">
                        <AiOutlineDollar size={'2em'} color='white'/>
                    </div>
                    <div>
                        <h3>33k</h3>
                        <p>Monthly product sale</p>
                    </div>
                </div>
                <div className='achievement-div'>
                    <div className="about-icon-container">
                        <FaShoppingBag size={'2em'} color='white'/>
                    </div>
                    <div>
                        <h3>45.5k</h3>
                        <p>Active customers</p>
                    </div>
                </div>
                <div className='achievement-div'>
                    <div className="about-icon-container">
                        <TbBasketDollar size={'2em'} color='white'/>
                    </div>
                    <div>
                        <h3>25k</h3>
                        <p>Annual gross sale</p>
                    </div>
                </div>
            </div>
            <div className="staffsss">
                <div className="staff1">
                    <img className='staff-img' src={Tom} alt="founder" />
                    <h3 className='staff-name'>Tom Cruise</h3>
                    <p className='staff-position'>founder & chairman</p>
                </div>
                <div className="staff2">
                    <img className='staff-img' src={Emma} alt="managing director" />
                    <h3 className='staff-name'>emma watson</h3>
                    <p className='staff-position'>managing director</p>
                </div>
                <div className="staff3">
                    <img className='staff-img' src={Will} alt="product designer" />
                    <h3 className='staff-name'>will smith</h3>
                    <p className='staff-position'>product designer</p>
                </div>
            </div>
        
        <PlaceHolders />
    </main>
  )
}

export default About