const express = require("express");
const year_based_route = express.Router();
const {
 createQuestion,
 getQuestionsBySubject,
 updateQuestionById,
 deleteQuestionById,
 getQuestionById,
} = require("../controller/year.controller");

year_based_route.post("/", createQuestion);
year_based_route.get("/get/:id", getQuestionById);

year_based_route.get("/:year", getQuestionsBySubject);
year_based_route.patch("/:id", updateQuestionById);
year_based_route.delete("/:id", deleteQuestionById);

module.exports = year_based_route;
