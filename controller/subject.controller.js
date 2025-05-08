const { SubjectBasedQuestion } = require("../models/questionBasedOnSubject");

const createQuestion = async (req, res) => {
 try {
  const {
   subject,
   text,
   options,
   question_options,
   correctOption,
   level,
   remarks,
  } = req.body;
  console.log(req.body);
  const newQuestion = new SubjectBasedQuestion({
   subject,
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
  const { subject } = req.params;
  const questions = await SubjectBasedQuestion.find({ subject });
  res.json(questions);
 } catch (error) {
  console.error("Error fetching questions:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};
const getQuestionById = async (req, res) => {
 try {
  const { id } = req.params;
  const question = await SubjectBasedQuestion.findById(id);
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
  const { text, options, correctOption, level, remarks,question_options } = req.body;
  const updatedQuestion = await SubjectBasedQuestion.findByIdAndUpdate(
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
  console.log("id:", id);
  await SubjectBasedQuestion.findByIdAndDelete(id);
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
