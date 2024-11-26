import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Products from "../../Components/ProductList/Products";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import "./Shop.css";

function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategories, setShowCategories] = useState(false);

  const [searchParams] = useSearchParams();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);

    // Get the category from the URL query parameter
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  return (
    <div className="shop">
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchh"
      />
      <div className="grid-template">
        <div className="left-grid">
          <span className="filter-btn" onClick={toggleCategories}>
            Filter <HiOutlineMenuAlt1 />
          </span>
          <ul className={showCategories ? "show-categories" : "hide-categories"}>
            <li>
              <button
                className={`categories-button ${
                  selectedCategory === "all" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              <button
                className={`categories-button ${
                  selectedCategory === "men's clothing" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("men's clothing")}
              >
                Men's clothing
              </button>
              <button
                className={`categories-button ${
                  selectedCategory === "women's clothing" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("women's clothing")}
              >
                Women's clothing
              </button>
              <button
                className={`categories-button ${
                  selectedCategory === "electronics" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("electronics")}
              >
                Electronics
              </button>
              <button
                className={`categories-button ${
                  selectedCategory === "jewelery" ? "active" : ""
                }`}
                onClick={() => setSelectedCategory("jewelery")}
              >
                Jewelry
              </button>
            </li>
          </ul>
        </div>
        <div className="right-grid">
          <Products searchQuery={searchQuery} selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
