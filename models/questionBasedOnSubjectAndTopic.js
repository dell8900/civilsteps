const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  question_options: [{ type: String }],
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
  level: { type: String },
  remarks: { type: String },
  paper_set: { type: Number, required: true, default: 1 },
});
const createQuestionModelTopic = (subject, topic) => {
  const collectionName = `${subject}_${topic}`;
  return mongoose.model(collectionName, questionSchema);
};

module.exports = createQuestionModelTopic;
