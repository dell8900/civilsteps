// subjectModel.js
const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
 name: { type: String, required: true, unique: true },
 // You can add more fields as per your requirements
});

const AddSubject = mongoose.model("Subject", subjectSchema);

module.exports = AddSubject;
