import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Categories.css"; 
import { GiClothes, GiJewelCrown } from "react-icons/gi";
import { GrRestroomWomen } from "react-icons/gr";
import { BsPhoneVibrate } from "react-icons/bs";

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Navigate to the Shop page with the selected category as a query parameter
    navigate(`/shop?category=${category}`);
  };

  return (
    <div className="categories-container">
       <div className='thismonth-container'>
        <div className="thismonth-design"></div>
        <span className='thismonth-text'>categories</span>
      </div>
      <h2 className="categories-header">Browse by Categories</h2>
      <div className="categories-list">
        <button
          className="category-item"
          onClick={() => handleCategoryClick("men's clothing")}
        >
          <GiClothes size={40}/>
          Men's Clothing
        </button>
        <button
          className="category-item"
          onClick={() => handleCategoryClick("women's clothing")}
        >
          <GrRestroomWomen size={40}/>
          Women's Clothing
        </button>
        <button
          className="category-item"
          onClick={() => handleCategoryClick("electronics")}
        >
          <BsPhoneVibrate size={40}/>
          Electronics
        </button>
        <button
          className="category-item"
          onClick={() => handleCategoryClick("jewelery")}
        >
          <GiJewelCrown size={40} />
          Jewelry
        </button>
      </div>
    </div>
  );
}

export default Categories;
