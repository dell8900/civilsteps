const express = require("express");
const subjectRouter = express.Router();
const {
 createQuestion,
 getQuestionsBySubject,
 updateQuestionById,
 deleteQuestionById,
 getQuestionById,
} = require("../controller/subject.controller");

subjectRouter.post("/", createQuestion);
subjectRouter.get("/get/:id", getQuestionById);

subjectRouter.get("/:subject", getQuestionsBySubject);
subjectRouter.patch("/:id", updateQuestionById);
subjectRouter.delete("/:id", deleteQuestionById);

module.exports = subjectRouter;
