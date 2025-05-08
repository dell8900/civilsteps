const express = require("express");
const subAndTopicAddRoutes = express.Router();

const {
 createSubject,
 addTopicToSubject,
 getTopicsBySubject,
 getAllSubjectsAndTopics,
 deleteTopicsFromSubject,
 deleteSubject,
} = require("../controller/subAndTopic");
// Route to create a new subject
subAndTopicAddRoutes.post("/subject", createSubject);

// Route to add a new topic to a subject
subAndTopicAddRoutes.post("/subject/:subjectId/topics", addTopicToSubject);

// Route to get topics by subject
subAndTopicAddRoutes.get("/subject/:subjectId/topics", getTopicsBySubject);

subAndTopicAddRoutes.delete("/rm-topic/:subjectId", deleteTopicsFromSubject);
subAndTopicAddRoutes.get("/subjects", getAllSubjectsAndTopics);
subAndTopicAddRoutes.delete('/subjects/:id', deleteSubject);

module.exports = subAndTopicAddRoutes;
