// subjectRoutes.js
const express = require("express");
const yearRoutes = express.Router();
const subjectController = require("../controller/AddYear.controller");

// Route to add a new year
yearRoutes.post("/year", subjectController.addYear);

// Route to retrieve all year
yearRoutes.get("/year", subjectController.getAllYear);
yearRoutes.delete("/year/:id", subjectController.deleteYear);

module.exports = yearRoutes;
