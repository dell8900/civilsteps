const mongoose = require("mongoose");

const testResultSchema = mongoose.Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Register", // Refers to UserModel
 },
 score: Number,
 questionsAttempted: Number,
 correctAnswers: Number,
 wrongAnswers: Number,
 totalNosQues: Number,
 category: String,
 submissionTime: {
  type: Date,
  default: Date.now,
 },
});

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = { TestResult };
