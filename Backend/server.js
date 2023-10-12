const express = require("express");
const mysql = require("mysql2");
// const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const app = express();
const cors = require("cors");
const config = require("./config");
const sseExpress = require("sse-express"); // Adjust the path as needed
// const saltRounds = 10; // Number of salt rounds for password hashing
// Generate a random secret key (e.g., 64 bytes)
const secretKey = config.secretKey;

// Enable CORS for all routes or specify origins explicitly
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", // Change to your MySQL host
  user: "root", // Change to your MySQL username
  password: "2004", // Change to your MySQL password
  database: "myfirstdatabase", // Change to your MySQL database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database");
  }
});

// API endpoint for user registration

app.post("/api/signup", (req, res) => {
  // Here, you can access user data from req.body
  const userData = req.body;

  // TODO: Validate and sanitize user data

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [userData.name, userData.email, userData.password],
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
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validate user input (you should add proper validation)

  // Check if the user exists in the database
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Check if a user with the provided email exists
    if (results.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = results[0];

    // Here, you should compare the provided password with the hashed password stored in the database
    // Example using bcrypt (uncomment and install 'bcrypt' to use):
    // bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
    //   if (bcryptErr) {
    //     console.error("Error comparing passwords:", bcryptErr);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }
    //
    //   if (bcryptResult) {
    //     // Passwords match, create a JWT token or set a session cookie to manage authentication
    //     return res.status(200).json({ message: "Login successful" });
    //   } else {
    //     // Passwords do not match
    //     return res.status(401).json({ error: "Incorrect password" });
    //   }
    // });

    // For this example, we're assuming plain text passwords (not secure)
    if (password === user.password) {
      // Passwords match (not secure, should use bcrypt or similar)
      return res.status(200).json({ message: "Login successful" });
    } else {
      // Passwords do not match
      return res.status(401).json({ error: "Incorrect password" });
    }
  });
});
// API endpoint for user login
// app.post("/api/login", async (req, res) => {
//   const { name, password } = req.body;

//   // Query the database to find the user by username or email
//   const query =
//     "SELECT * FROM users WHERE name = ? OR email = ? AND password = ?";
//   db.query(query, [name, name, password], async (err, results) => {
//     if (err) {
//       console.error("Error querying the database:", err);
//       return res.status(500).json({ message: "Error querying the database:" });
//     }
//     if (results.length > 0) {
//       return res.json("Login Successfully");
//     } else {
//       // User not found
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     // const token = jwt.sign({ userId: user.id }, secretKey, {
//     //   expiresIn: "1h",
//     // });

//     // // Send the token as a response
//     // res.json({ token });
//   });
// });

// Route to add to cart
// app.post("/api/add-to-cart", (req, res) => {
//   const { product } = req.body;
//   console.log(req.body);

//   try {
//     let productName, price, productId, productImage;

//     // Check if the request body follows the first format ('title' and 'price')
//     if (req.body.title && req.body.price) {
//       productName = req.body.title;
//       price = req.body.price;
//       productId = req.body.id; // Assuming this is present in both formats
//       productImage = req.body.image; // Assuming this is present in both formats
//     } else if (req.body.name && req.body.price.raw) {
//       // Check if the request body follows the second format ('name' and 'price.raw')
//       productName = req.body.name;
//       price = req.body.price.raw;
//       productId = req.body.price.raw; // Assuming this is present in both formats
//       productImage = req.body.image.url; // Assuming this is present in both formats
//     } else {
//       // Handle the case where the format is not recognized
//       return res.status(400).json({ error: "Invalid product format" });
//     }

//     db.query(
//       "INSERT INTO cart (product_name, price, quantity, product_image) VALUES (?, ?, ?, ?)",
//       [productName, price, productId, productImage] // Assuming a default quantity of 1
//     );

//     return res.json({ message: "Product added successfully" });
//   } catch (error) {
//     console.error("Error adding product to cart:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.post("/api/add-to-cart", (req, res) => {
  const { product } = req.body;

  try {
    let productName, price, productId, productImage;

    if (req.body.title && req.body.price) {
      productName = req.body.title;
      price = req.body.price;
      productId = req.body.id;
      productImage = req.body.image;
    } else if (req.body.name && req.body.price.raw) {
      productName = req.body.name;
      price = req.body.price.raw;
      productId = req.body.price.raw;
      productImage = req.body.image.url;
    } else {
      return res.status(400).json({ error: "Invalid product format" });
    }

    // Check if the product with the same name is already in the cart
    db.query(
      "SELECT * FROM cart WHERE product_name = ?",
      [productName],
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
            "UPDATE cart SET quantity = ? WHERE product_name = ?",
            [newQuantity, productName],
            (updateError, updateResults) => {
              if (updateError) {
                console.error(
                  "Error updating quantity in the cart:",
                  updateError
                );
                return res.status(500).json({ error: "Internal Server Error" });
              }
              return res.json({
                message: "Product added to cart successfully",
              });
            }
          );
        } else {
          // If the product is not in the cart, insert it
          db.query(
            "INSERT INTO cart (product_name, price, quantity, product_image) VALUES (?, ?, ?, ?)",
            [productName, price, 1, productImage],
            (insertError, insertResults) => {
              if (insertError) {
                console.error(
                  "Error inserting product into cart:",
                  insertError
                );
                return res.status(500).json({ error: "Internal Server Error" });
              }
              return res.json({
                message: "Product added to cart successfully",
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to retrieve cart details
app.get("/api/cart", (req, res) => {
  try {
    // Execute a SELECT query to retrieve cart details
    db.query("SELECT * FROM cart", (error, results) => {
      if (error) {
        console.error("Error retrieving cart details:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // Send the retrieved cart details as a JSON response
      return res.json(results);
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
  db.query(
    "DELETE FROM cart WHERE cart_id = ?",
    [cartItemId],
    (error, results) => {
      if (error) {
        console.error("Error deleting cart item:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res
        .status(200)
        .json({ message: "Cart item deleted successfully" });
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
