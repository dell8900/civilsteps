const mongoose = require("mongoose");

const questionBasedOnSubject = mongoose.Schema({
 subject: { type: String },
 text: { type: String, required: true },
 options: [{ type: String, required: true }],
 question_options: [{ type: String }],

 correctOption: { type: Number, required: true },
 level: { type: String },
 remarks: { type: String },
});

const SubjectBasedQuestion = mongoose.model(
 "Questions_Based_On_Subject",
 questionBasedOnSubject
);

module.exports = { SubjectBasedQuestion };
