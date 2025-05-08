const mongoose = require("mongoose");

// Schema for Topics
const topicSchema = new mongoose.Schema({
 name: { type: String, required: true },
});

// Schema for Subjects
const subjectSchema = new mongoose.Schema({
 name: { type: String, required: true },
 topics: [topicSchema], // Array of topics related to this subject
});

// Models
const SubjectAdd = mongoose.model("SubjectTopic", subjectSchema);
const TopicAdd = mongoose.model("TopicAdd", topicSchema);

module.exports = { SubjectAdd, TopicAdd };
