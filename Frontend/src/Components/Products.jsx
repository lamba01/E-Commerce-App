// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../Styles/Products.css"

// function ProductList() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then((response) => {
//         setProducts(response.data);
//         console.log(response.data)
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []); 
//   const addToCart = async (product) => {
//     try {
//       const response = await axios.post("/api/add-to-cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });
//       if (response.status === 200) {
//         alert("product added successfully");
//       }
//     } catch (error) {
//       console.error("error adding product to cart:", error);
//       alert("Error!");
//     }
//   };


//   return (
//     <div>
//       <h1>Product List</h1>
//         {products.map((product) => (
//             <div className="product-card" key={product.id}>
//       <img
//         className="product-image"
//         src={product.image}
//         alt={product.name}
//       />
//       <div className="product__info">
//         <h4 className="product__name">{product.title}</h4>
//         <p className="product__description">
//           {product.category}
//         </p>
//         <div className="product__details">
//           <p className="product__price">
//            ${product.price}
//           </p>
//         </div>
//         <button onClick={() => addToCart()}>Add to cart</button>
//       </div>
//     </div>          
//         ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Products.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await axios.post('/api/add-to-cart', product);
      if (response.status === 200) {
        alert('Product added successfully');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error!');
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <div className="product__info">
            <h4 className="product__name">{product.title}</h4>
            <p className="product__description">{product.category}</p>
            <div className="product__details">
              <p className="product__price">${product.price}</p>
            </div>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;


// export default ProductList;

