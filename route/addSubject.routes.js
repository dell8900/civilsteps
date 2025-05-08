// subjectRoutes.js
const express = require("express");
const subjectRoutes = express.Router();
const subjectController = require("../controller/AddSubject.controller");

// Route to add a new subject
subjectRoutes.post("/subjects", subjectController.addSubject);

// Route to retrieve all subjects
subjectRoutes.get("/subjects", subjectController.getAllSubjects);
subjectRoutes.delete("/subject/:id", subjectController.deleteSubject);

module.exports = subjectRoutes;
