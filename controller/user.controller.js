const express = require("express");
const app = express.Router();
const UserModel = require("../models/Auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const { ResetTokenModel } = require("../models/resetTokenModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const registerUser = async (req, res) => {
//   try {
//     const {
//       Firstname,
//       Lastname,
//       Age,
//       Location,
//       Gender,
//       Noofattempts,
//       Email,
//       Whatsappno,
//       Mobileno,
//       Password,
//     } = req.body;

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ Mobileno });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(Password, 10);

//     // Create new user
//     const newUser = new UserModel({
//       Firstname,
//       Lastname,
//       Age,
//       Location,
//       Gender,
//       Noofattempts,
//       Email,
//       Whatsappno,
//       Mobileno,
//       Password: hashedPassword,
//     });

//     // Save the user
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to add user" });
//   }
// };
// const loginUser = async (req, res) => {
//   try {
//     const { Mobileno, Password } = req.body;

//     console.log("Login attempt for mobile number:", Mobileno);

//     // Find user by mobile number
//     const user = await UserModel.findOne({ Mobileno });
//     if (!user) {
//       console.log("User not found for mobile number:", Mobileno);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     console.log("User found:", user);

//     // Compare the password
//     const isMatch = await bcrypt.compare(Password, user.Password);
//     if (!isMatch) {
//       console.log("Password mismatch for user:", user.Email);
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Respond with success
//     console.log("Login successful for user:", user.Email);
//     res.status(200).json({ message: "Sign-in successful", user });
//   } catch (error) {
//     console.error("Sign-in failed error:", error);
//     res.status(500).json({ error: "Sign-in failed" });
//   }
// };

// const registerUser = async (req, res) => {
//   try {
//     const {
//       Firstname,
//       Lastname,
//       Age,
//       Location,
//       Gender,
//       Noofattempts,
//       Email,
//       Whatsappno,
//       Mobileno,
//       Password,
//     } = req.body;

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ Mobileno });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(Password, 10);

//     // Create new user
//     const newUser = new UserModel({
//       Firstname,
//       Lastname,
//       Age,
//       Location,
//       Gender,
//       Noofattempts,
//       Email,
//       Whatsappno,
//       Mobileno,
//       Password: hashedPassword,
//       level: 'Free'  // Default user level
//     });

//     // Save the user
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign({ _id: newUser._id, level: newUser.level }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ message: "User registered successfully", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to add user" });
//   }
// };

const registerUser = async (req, res) => {
 try {
  const {
   Firstname,
   Lastname,
   Age,
   Location,
   Gender,
   Noofattempts,
   Email,
   Whatsappno,
   Mobileno,
   Password,
   premium, // Include premium in the request body
  } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ Mobileno });
  if (existingUser) {
   return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(Password, 10);

  // Create new user
  const newUser = new UserModel({
   Firstname,
   Lastname,
   Age,
   Location,
   Gender,
   Noofattempts,
   Email,
   Whatsappno,
   Mobileno,
   Password: hashedPassword,
   level: 1, // Default user level
   premium: premium || false, // Default to false if not provided
  });

  // Save the user
  await newUser.save();

  // Generate JWT token
  const token = jwt.sign(
   { _id: newUser._id, premium: newUser.premium },
   process.env.JWT_SECRET,
   { expiresIn: "1h" }
  );

  res.status(201).json({ message: "User registered successfully", token });
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to add user" });
 }
};

const loginUser = async (req, res) => {
 try {
  const { Mobileno, Password } = req.body;

  // Find user by mobile number
  const user = await UserModel.findOne({ Mobileno });
  if (!user) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare the password
  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
   return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
   { _id: user._id, premium: user.premium },
   process.env.JWT_SECRET, // Use your own secret key
   { expiresIn: "1h" }
  );

  // Respond with success and user details
  res.status(200).json({
   message: "Sign-in successful",
   token,
   user,
  });
 } catch (error) {
  res.status(500).json({ error: "Sign-in failed" });
 }
};

const forgetReq = async (req, res) => {
 const { Email } = req.body;
 console.log("Email:", Email);
 try {
  const user = await UserModel.findOne({ Email: Email.toLowerCase() });
  if (!user) {
   return res.status(404).json({ message: "User not found" });
  }

  const token = Math.random().toString(36).substring(7);

  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 1);

  await new ResetTokenModel({
   email: user.Email.toLowerCase(),
   token,
   expiryTime,
  }).save();

  const transporter = nodemailer.createTransport({
   host: "smtp.hostinger.com",
   port: 587,
   secure: false,
   auth: {
    user: "pushpendra@arvmultimedia.com",
    pass: "Arv@1996",
   },
  });

  const resetLink = `https://civilsteps.com/reset-password/${token}`;
  const mailOptions = {
   from: "pushpendra@arvmultimedia.com",
   to: user.Email,
   subject: "Password Reset Request",
   html: `<p>You have requested to reset your password. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ message: "Failed to send reset email" });
   }
   console.log("Email sent: " + info.response);
   res.status(200).json({ message: "Reset email sent" });
  });
 } catch (error) {
  console.error("Forget request error:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
};
const resetPassword = async (req, res) => {
 const { token, newPassword } = req.body;

 try {
  const resetToken = await ResetTokenModel.findOne({ token });

  if (!resetToken) {
   console.log("Invalid token:", token);
   return res.status(400).json({ message: "Invalid or expired token" });
  }

  if (resetToken.expiryTime < new Date()) {
   console.log("Token expired:", token);
   await ResetTokenModel.deleteOne({ token });
   return res.status(400).json({ message: "Token has expired" });
  }

  const user = await UserModel.findOne({ Email: resetToken.email });

  if (!user) {
   console.log("User not found for email:", resetToken.email);
   return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log("Hashed password:", hashedPassword);

  user.Password = hashedPassword;
  await user.save();

  await ResetTokenModel.deleteOne({ token });

  console.log("Password reset successfully for user:", user.Email);
  res.status(200).json({ message: "Password reset successfully" });
 } catch (error) {
  console.error("Password reset error:", error);
  res.status(500).json({ message: "Internal Server Error" });
 }
};

module.exports = {
 registerUser,
 loginUser,
 forgetReq,
 resetPassword,
};
