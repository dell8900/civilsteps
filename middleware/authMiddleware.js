const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
 const authHeader = req.header("Authorization");
 // console.log('Received auth header:', authHeader);

 if (!authHeader) {
  console.log("No auth header provided");
  return res.sendStatus(401); // Unauthorized
 }

 const token = authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"
 if (!token) {
  console.log("No token found after splitting Bearer");
  return res.sendStatus(401); // Unauthorized
 }

 jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  if (err) {
   console.log("Token verification failed:", err.message);
   return res.sendStatus(403); // Forbidden
  }
  req.user = user;
  // console.log("Token verified, user:", user);
  next();
 });
};

const checkPremium = (req, res, next) => {
 if (!req.user.premium) {
  // console.log("User is not premium");
  return res.status(403).send("Access denied. Upgrade to premium.");
 }
 next();
};

module.exports = { authenticateToken, checkPremium };
