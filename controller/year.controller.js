const { YearWiseQuestion } = require("../models/questionBasedOnYear");

const createQuestion = async (req, res) => {
 try {
  const {
   year,
   text,
   question_options,
   options,
   correctOption,
   level,
   remarks,
  } = req.body;
  const newQuestion = new YearWiseQuestion({
   year,
   text,
   options,
   correctOption,
   question_options,
   level,
   remarks,
  });
  await newQuestion.save();
  res.status(201).json(newQuestion);
 } catch (error) {
  console.error("Error creating question:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

const getQuestionsBySubject = async (req, res) => {
 try {
  const { year } = req.params;
  const questions = await YearWiseQuestion.find({ year });
  res.json(questions);
 } catch (error) {
  console.error("Error fetching questions:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};
const getQuestionById = async (req, res) => {
 try {
  const { id } = req.params;
  const question = await YearWiseQuestion.findById(id);
  if (!question) {
   return res.status(404).json({ error: "Question not found" });
  }
  res.json(question);
 } catch (error) {
  console.error("Error fetching question by ID:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

const updateQuestionById = async (req, res) => {
 try {
  const { id } = req.params;
  const { text, options, correctOption, level, remarks, question_options } = req.body;
  const updatedQuestion = await YearWiseQuestion.findByIdAndUpdate(
   id,
   {
    text,
    options,
    correctOption,
    level,
    remarks,
    question_options
   },
   { new: true }
  );
  res.status(201).json(updatedQuestion);
 } catch (error) {
  console.error("Error updating question:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

const deleteQuestionById = async (req, res) => {
 try {
  const { id } = req.params;
  await YearWiseQuestion.findByIdAndDelete(id);
  res.json({ message: "Question deleted successfully" });
 } catch (error) {
  console.error("Error deleting question:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

module.exports = {
 createQuestion,
 getQuestionsBySubject,
 updateQuestionById,
 deleteQuestionById,
 getQuestionById,
};
