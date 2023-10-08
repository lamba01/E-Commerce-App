const crypto = require("crypto");

module.exports = {
  secretKey: crypto.randomBytes(32).toString("hex"), // Generates a 32-byte (256-bit) random hexadecimal secret key
  db: {
    host: "localhost",
    user: "root",
    password: "2004",
    database: "myfirstdatabase",
  },
};
