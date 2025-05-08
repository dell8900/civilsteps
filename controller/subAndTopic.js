// Import the necessary models
const { SubjectAdd, TopicAdd } = require("../models/subjectAndTopic.model");

// Function to create a new subject
const createSubject = async (req, res) => {
  const { name } = req.body;
  try {
    const subject = new SubjectAdd({ name });
    await subject.save();
    res.status(201).json({
      message: "Subject added successfully",
      data: subject,
    });
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteSubject = async (req, res) => {
  const { id } = req.params; // Assuming the subject ID is passed as a URL parameter
  try {
    // Find the subject by ID and delete it
    const subject = await SubjectAdd.findByIdAndDelete(id);

    if (!subject) {
      // If subject is not found, return 404
      return res.status(404).json({ error: "Subject not found" });
    }

    // Return success message
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addTopicToSubject = async (req, res) => {
  const { subjectId } = req.params;
  const { topics } = req.body; // topics is an array of topic names
  console.log("topics:", req.body);
  try {
    const updatedSubject = await SubjectAdd.findByIdAndUpdate(
      subjectId,
      {
        $push: {
          topics: { $each: topics.map((topicName) => ({ name: topicName })) },
        },
      }, // Map topic names to an array of objects with name property
      { new: true }
    );
    res.status(201).json({
      message: "Topics added to subject successfully",
      updatedSubject: updatedSubject,
    });
  } catch (error) {
    console.error("Error adding topics to subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteTopicsFromSubject = async (req, res) => {
  const { subjectId } = req.params;
  const { topicIds } = req.body; // topicIds is an array of topic IDs to be deleted
  console.log("topicIds:", subjectId);
  try {
    const updatedSubject = await SubjectAdd.findByIdAndUpdate(
      subjectId,
      { $pull: { topics: { _id: { $in: topicIds } } } }, // Remove topics with matching IDs
      { new: true }
    );
    res.status(200).json({
      message: "Topics deleted from subject successfully",
      updatedSubject: updatedSubject,
    });
  } catch (error) {
    console.error("Error deleting topics from subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get topics by subject
const getTopicsBySubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const subject = await SubjectAdd.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    res.status(200).json({
      topic: subject.topics,
      subject: subject.name,
    });
  } catch (error) {
    console.error("Error getting topics by subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllSubjectsAndTopics = async (req, res) => {
  try {
    // Find all subjects and populate their associated topics
    const subjects = await SubjectAdd.find().populate("topics");

    // If no subjects are found, return an empty array
    if (!subjects || subjects.length === 0) {
      return res.status(200).json({ message: "No subjects found", data: [] });
    }

    // Return the array of subjects with their populated topics
    res.status(200).json({ message: "Subjects with topics", data: subjects });
  } catch (error) {
    console.error("Error getting all subjects with topics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSubject,
  addTopicToSubject,
  getTopicsBySubject,
  getAllSubjectsAndTopics,
  deleteTopicsFromSubject,
  deleteSubject,
};
