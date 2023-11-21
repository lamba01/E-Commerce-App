const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const ejs = require("ejs");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const { transcode } = require("buffer");
const { error } = require("console");
const secretKey = process.env.SECRET_KEY;

// Enable CORS for all routes or specify origins explicitly
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

// Other middleware
app.use(express.json());
app.use(cookieParser());
const db = mysql.createConnection(process.env.DATABASE_URL);

db.query("SELECT 1", (error, results, fields) => {
  if (error) {
    console.error("Error connecting to PlanetScale:", error);
    throw error;
  }
  console.log("Connected to PlanetScale!");
  console.log("Example query result:", results);
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// API endpoint for user registration
app.post("/api/signup", async (req, res) => {
  // Here, you can access user data from req.body
  const userData = req.body;
  const Encpass = await bcrypt.hash(userData.password, 10);

  db.query(
    "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
    [userData.name, userData.email, Encpass],
    (err, result) => {
      if (err) {
        console.error("Error inserting user data:", err);
        // Handle the error appropriately
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("User data inserted successfully");
      // Respond with a success message
      return res.json({ message: "User signed up successfully" });
    }
  );
});

// API endpoint for user login
app.post("/api/login", async (req, res) => {
  const { email, password, rememberMe } = req.body;

  // Check if the user exists in the database
  db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Check if a user with the provided email exists
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password stored in the database using bcrypt
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (bcryptResult) {
        const tokenExpiration = rememberMe ? "3d" : "1d";
        // Passwords match, create a JWT token for authentication
        const token = jwt.sign({ userId: user.id }, secretKey, {
          expiresIn: tokenExpiration, // You can adjust the token expiration time
        });
        // console.log("Token generated and signed:", token);
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };

        // Return a response to the client
        res.status(200).cookie("token", token, options).json({
          message: "Login successful",
          token,
          userId: user.id,
          userName: user.name,
        });
      } else {
        // Passwords do not match
        return res.status(401).json({ error: "Incorrect password" });
      }
    });
  });
});

// Route to add to cart
app.post("/api/add-to-cart", (req, res) => {
  const product = req.body;
  const token = req.headers.authorization;

  try {
    // Check if the token is provided in the request headers
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      // User is authenticated; you can access their user ID from the 'decoded' object
      const userId = decoded.userId;
      let productName, price, productId, productImage, productRoute;

      if (product.title && product.price) {
        productName = product.title;
        price = product.price;
        productId = product.id;
        productImage = product.image;
        productRoute = "products";
      } else if (product.name && product.price.raw) {
        productName = product.name;
        price = product.price.raw;
        productId = product.id;
        productImage = product.image.url;
        productRoute = "product";
      } else {
        return res.status(400).json({ error: "Invalid product format" });
      }

      // Check if the product with the same name is already in the user's cart
      db.query(
        "SELECT * FROM cart WHERE user_id = ? AND product_name = ?",
        [userId, productName],
        (selectError, selectResults) => {
          if (selectError) {
            console.error(
              "Error checking if the product is in the cart:",
              selectError
            );
            return res.status(500).json({ error: "Internal Server Error" });
          }

          if (selectResults.length > 0) {
            // If the product is already in the cart, update the quantity
            const currentQuantity = selectResults[0].quantity;
            const newQuantity = currentQuantity + 1;
            db.query(
              "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_name = ?",
              [newQuantity, userId, productName],
              (updateError, updateResults) => {
                if (updateError) {
                  console.error(
                    "Error updating quantity in the cart:",
                    updateError
                  );
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }
                return res.json({
                  message: "Product added to cart successfully",
                });
              }
            );
          } else {
            // If the product is not in the cart, insert it
            db.query(
              "INSERT INTO cart (user_id, product_name, price, quantity, product_image, product_id, route) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                userId,
                productName,
                price,
                1,
                productImage,
                productId,
                productRoute,
              ],
              (insertError, insertResults) => {
                if (insertError) {
                  console.error(
                    "Error inserting product into cart:",
                    insertError
                  );
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }
                return res.json({
                  message: "Product added to cart successfully",
                });
              }
            );
          }
        }
      );
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to retrieve cart details
app.get("/api/cart", (req, res) => {
  const token = req.headers.authorization;

  try {
    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = decoded.userId;

      // Execute a SELECT query to retrieve cart details for the specific user
      db.query(
        "SELECT * FROM cart WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) {
            console.error("Error retrieving cart details:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          // Send the retrieved cart details as a JSON response
          return res.json(results);
        }
      );
    });
  } catch (error) {
    console.error("Error retrieving cart details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete from cart
app.delete("/api/cart/:cartItemId", (req, res) => {
  const cartItemId = req.params.cartItemId;

  // Implement the deletion logic to remove the item from the cart table
  db.query("DELETE FROM cart WHERE id = ?", [cartItemId], (error, results) => {
    if (error) {
      console.error("Error deleting cart item:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Cart item deleted successfully" });
  });
});

const cartStore = {};
// Route to place an order
app.post("/api/place-order", (req, res) => {
  const token = req.headers.authorization;

  try {
    // Check if the token is provided in the request headers
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      // User is authenticated; you can access their user ID from the 'decoded' object
      const userId = decoded.userId;

      // Retrieve the user's cart content
      db.query(
        "SELECT * FROM cart WHERE user_id = ?",
        [userId],
        (selectError, cartItems) => {
          if (selectError) {
            console.error("Error retrieving cart content:", selectError);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          // Store the order details in a variable or database
          cartStore[userId] = cartItems;

          // Insert the cart content into the orders table
          // Modify the code that inserts orders from the cart
          const orderItems = cartItems.map((item) => ({
            user_id: item.user_id,
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity,
            product_image: item.product_image,
            product_id: item.product_id,
            route: item.route,
            date: new Date(),
            status: "Shipped",
          }));

          const values = orderItems.map((item) => Object.values(item));

          db.query(
            "INSERT INTO orders (user_id, product_name, price, quantity, product_image, product_id, route, date, status) VALUES ?",
            [values],
            (insertError, insertResults) => {
              if (insertError) {
                console.error("Error inserting order data:", insertError);
                return res.status(500).json({ error: "Internal Server Error" });
              }

              // Clear the user's cart
              db.query(
                "DELETE FROM cart WHERE user_id = ?",
                [userId],
                (deleteError) => {
                  if (deleteError) {
                    console.error("Error deleting cart content:", deleteError);
                    return res
                      .status(500)
                      .json({ error: "Internal Server Error" });
                  }

                  return res.json({ message: "Order placed successfully" });
                }
              );
            }
          );
        }
      );
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//Route to get orders
app.get("/api/orders", (req, res) => {
  const token = req.headers.authorization;

  try {
    // Extract the JWT token from the "Authorization" header
    const tokenParts = token.split(" "); // Split "Bearer {token}" into an array
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const jwtToken = tokenParts[1];

    // Verify the JWT token using the secret key
    jwt.verify(jwtToken, secretKey, (jwtError, decoded) => {
      if (jwtError) {
        // JWT verification failed; return an unauthorized response
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userId = decoded.userId;

      // Execute a SELECT query to retrieve orders for the specific user
      db.query(
        "SELECT * FROM orders WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) {
            console.error("Error retrieving orders:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          // Send the retrieved orders as a JSON response
          return res.json(results);
        }
      );
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
// Define the HTTP server
module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
