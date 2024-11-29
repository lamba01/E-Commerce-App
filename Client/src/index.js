import React from "react";
import ReactDOM from "react-dom/client";
import { ProductsProvider } from './context/ProductsContext';
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProductsProvider>
    <App />
  </ProductsProvider>
);
