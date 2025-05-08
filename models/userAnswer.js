// models/UserAnswer.js

const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
 },
 questionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Question",
  required: true,
 },
 selectedOption: {
  type: String,
  required: true,
 },
});

const UserAnswerModel = mongoose.model("UserAnswer", UserAnswerSchema);
module.exports = {
 UserAnswerModel,
};
