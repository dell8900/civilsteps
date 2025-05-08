const express = require("express");

const userAnswerRoutes = express.Router();

userAnswerRoutes.post("/user-selected-answer");
userAnswerRoutes.get("/:userId");

module.exports = {
  userAnswerRoutes,
};
