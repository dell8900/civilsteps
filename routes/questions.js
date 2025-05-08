// routes/questions.js
const express = require("express");
const router = express.Router();
const createQuestionModel = require("../models/questions"); // Import the
router.post("/", async (req, res) => {
 try {
  const { subject, year, topic, text, options, correctOption,remarks  } =
   req.body;
  console.log(req.body);

  // Create a model for the specific subject-year collection
  const QuestionModel = createQuestionModel(subject, year, topic, );

  const newQuestion = new QuestionModel({
   text,
   options,
   correctOption,
   remarks
   
  });
  await newQuestion.save();
  res.status(201).json(newQuestion);
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: "Failed to add a question." });
 }
});

module.exports = router;
