import React, { useState, useEffect } from "react";
import commerce from "../../lib/Commerce"; // Assuming this is your Commerce library
import Products from "../../Components/ProductList/Products";
import ProductsList from "../../Components/ProductsList";
import "./Shop.css";

function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // Define products state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    commerce.products
      .list()
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => {
        console.log("There was an error fetching the products", error);
      });
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Products searchQuery={searchQuery} />
      <ProductsList searchQuery={searchQuery} products={filteredProducts} />
    </div>
  );
}

export default Shop;
