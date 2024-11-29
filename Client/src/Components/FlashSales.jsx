import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ProductsContext } from '../context/ProductsContext';
import '../Styles/FlashSales.css';
import AddToCartButton from './Addtocart';

function FlashSales() {
  const products = useContext(ProductsContext);
  const electronics = products?.filter((product) => product.category === 'electronics') || [];
  const [timeLeft, setTimeLeft] = useState({ days: 9, hours: 0, minutes: 0, seconds: 0 });

  // Countdown Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.days * 86400 + prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          days: Math.floor(totalSeconds / 86400),
          hours: Math.floor((totalSeconds % 86400) / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // Slick Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
          breakpoint: 768, // For smaller screens
          settings: {
            slidesToShow: 3, // Show 3 slides on smaller screens
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480, // For even smaller screens
          settings: {
            slidesToShow: 2, // Show 2 slide
          },
        },
      ],
  };

  // Custom Arrow Components
  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <button className="carousel-arrow next-arrow" onClick={onClick}>
        &gt;
      </button>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <button className="carousel-arrow prev-arrow" onClick={onClick}>
        &lt;
      </button>
    );
  }

  if (electronics.length === 0) {
    return <div>No electronics available</div>;
  }

  return (
    <div className="flashsales-container">
      <div className="thismonth-container">
        <div className="thismonth-design"></div>
        <span className="thismonth-text">today's</span>
      </div>
      <div className='flashsales-header-container'>
        <h2 className="flashsales-header">Flash Sales </h2>
        <div className="countdown">
            <div>
                <p className='countdown-header'>days</p>
                <span className='countdown-time'>0{timeLeft.days}</span>       
            </div>
            :
            <div>
                <p className='countdown-header'>Hours</p>
                <span className='countdown-time'>{timeLeft.hours}</span>
            </div>
            :
            <div>
                <p className='countdown-header'>minutes</p>
                <span className='countdown-time'>{timeLeft.minutes}</span>
            </div>
            :
            <div>
                <p className='countdown-header'>seconds</p>
                <span className='countdown-time'>{timeLeft.seconds}</span>
            </div>
        </div>
      </div>
      <Slider {...settings} className="carousel">
        {electronics.map((product) => (
          <div key={product.id} className="flashsale-product-card">
            <div className="img-container">
            <img
              className="product--image"
              src={product.image}
              alt={product.title}
            />

            </div>
            <div className="flashsale-product-info">
              <h4>{product.title}</h4>
              <p>${product.price}</p>
            </div>
            <div className="add-to-cart-container">
                <AddToCartButton
                    product={product}
                    onaddToCart={() => console.log('Product added:', product)}
                />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FlashSales;


