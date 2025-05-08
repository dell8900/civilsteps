const mongoose = require("mongoose");

const questionBasedOnYear = mongoose.Schema({
 year: { type: Number },
 text: { type: String, required: true },
 options: [{ type: String, required: true }],
 question_options: [{ type: String }],
 correctOption: { type: Number, required: true },
 level: { type: String },
 remarks: { type: String },
});

const YearWiseQuestion = mongoose.model(
 "Questions_Based_On_Year",
 questionBasedOnYear
);
module.exports = { YearWiseQuestion };
