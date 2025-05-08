const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
 text: { type: String, required: true },
 options: [{ type: String, required: true }],
 correctOption: { type: Number, required: true },
 level: { type: String },
 remarks:{type:String}

});
const createQuestionModel = (subject, year, topic) => {
 let collectionName;
 if (subject && !topic && !year) {
  collectionName = subject;
 }
 if (!subject && !topic && year) {
  collectionName = year;
 }

 return mongoose.model(collectionName, QuestionSchema, collectionName);
};

module.exports = createQuestionModel;
