const express = require("express");
const {
 registerUser,
 loginUser,
 forgetReq,
 resetPassword,
} = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forget-password", forgetReq);
userRouter.post("/reset-password", resetPassword);

module.exports = {
 userRouter,
};
