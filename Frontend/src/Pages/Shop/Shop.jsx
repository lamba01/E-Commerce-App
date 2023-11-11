import React, { useState, useEffect } from "react";
import commerce from "../../lib/Commerce"; // Assuming this is your Commerce library
import Products from "../../Components/ProductList/Products";
import ProductsList from "../../Components/ProductsList";
import "./Shop.css";

function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Default to 'all'
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);

  // const fetchCategories = () => {
  //   commerce.categories
  //     .list()
  //     .then((categories) => {
  //       setCategories(categories.data);
  //       console.log(categories)
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the categories", error);
  //     });
  // };


  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
        console.log(products.data)
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on the selected category and search query
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return (
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.category === selectedCategory
      );
    }
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchh"
      />
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="men's clothing">men's clothing</option>
        <option value="women's clothing">Women's clothing</option>
        <option value="electronics">Electronics</option>
        <option value="jewelery">Jewelery</option>
      </select>
      <Products searchQuery={searchQuery} selectedCategory={selectedCategory} />
      <ProductsList searchQuery={searchQuery} products={filteredProducts} />
    </div>
  );
}

export default Shop;
