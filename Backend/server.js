// backend/server.js
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

// Enable CORS for all routes or specify origins explicitly
app.use(cors());

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
  } else {
    console.log("Connected to the database");
  }
});

// Body parsing middleware to handle JSON data
app.use(express.json());

// API endpoint for user sign-up
app.post("/api/signup", (req, res) => {
  // Here, you can access user data from req.body
  const userData = req.body;

  // TODO: Validate and sanitize user data

  // Example: Insert user data into the database
  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [userData.name, userData.email, userData.password],
    (err, results) => {
      if (err) {
        console.error("Error inserting user data:", err);
        // Handle the error appropriately
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("User data inserted successfully");
        // Respond with a success message
        res.json({ message: "User signed up successfully" });
      }
    }
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
