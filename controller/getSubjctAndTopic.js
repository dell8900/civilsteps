const createQuestionModelTopic = require("../models/questionBasedOnSubjectAndTopic");

const getQuestionsBySubjectAndTopic = async (req, res) => {
  try {
    const { subject, topic } = req.params;
    // console.log("question based on subject and topic", subject, topic);
    const QuestionModel = createQuestionModelTopic(subject, topic);
    const questions = await QuestionModel.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const { subject, topic } = req.params;
    const questions = await createQuestionModelTopic.find();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const addQuestionToDatabase = async (req, res) => {
  try {
    const { subject, topic } = req.params;
    const {
      text,
      question_options,
      options,
      correctOption,
      level,
      remarks,
      paper_set,
    } = req.body;

    const QuestionModel = createQuestionModelTopic(subject, topic);
    const newQuestion = new QuestionModel({
      text,
      question_options,
      options,
      correctOption,
      level,
      remarks,
      paper_set,
    });

    await newQuestion.save();

    res.status(201).json({ message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller Function
const getQuestionById = async (req, res) => {
  try {
    const { id, subject, topic } = req.params;

    // Assuming you have a Question model defined
    const QuestionModel = createQuestionModelTopic(subject, topic);
    const question = await QuestionModel.findById(id);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ question });
  } catch (error) {
    console.error("Error retrieving question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editQuestionInDatabase = async (req, res) => {
  try {
    const { subject, topic, questionId } = req.params;
    const { text, options, correctOption, level, remarks, question_options } =
      req.body;

    // Find the question model based on the subject, topic, and questionId
    const QuestionModel = createQuestionModelTopic(subject, topic);
    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Update the question fields
    question.text = text;
    question.options = options;
    question.correctOption = correctOption;
    question.level = level;
    question.remarks = remarks;
    question.question_options = question_options;

    // Save the updated question to the database
    await question.save();

    res.status(200).json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Error editing question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteQuestionFromDatabase = async (req, res) => {
  try {
    const { subject, topic, questionId } = req.params;

    const QuestionModel = createQuestionModelTopic(subject, topic);

    const deletedQuestion = await QuestionModel.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addQuestionToDatabase,
  getQuestionsBySubjectAndTopic,
  getAll,
  getQuestionById,
  editQuestionInDatabase,
  deleteQuestionFromDatabase,
};
