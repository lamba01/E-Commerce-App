const express = require("express");
const mysql = require("mysql2");
// const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const app = express();
const cors = require("cors");
const config = require("./config"); // Adjust the path as needed
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
