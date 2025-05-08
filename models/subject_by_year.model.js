// subjectModel.js
const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema({
 year: { type: Number, required: true, unique: true },
 // You can add more fields as per your requirements
});

const AddYear = mongoose.model("Year", subjectSchema);

module.exports = AddYear;
