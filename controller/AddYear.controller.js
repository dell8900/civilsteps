// subjectController.js

const AddYear = require("../models/subject_by_year.model");

const addYear = (req, res) => {
 const { year } = req.body;

 const newSubject = new AddYear({
  year,
 });

 newSubject
  .save()
  .then((subject) => {
   res.status(201).json(subject);
  })
  .catch((error) => {
   res.status(500).json({ error: error.message });
  });
};

const getAllYear = (req, res) => {
 AddYear.find()
  .then((subjects) => {
   res.status(200).json(subjects);
  })
  .catch((error) => {
   res.status(500).json({ error: error.message });
  });
};
const deleteYear = async (req, res) => {
  const { id } = req.params;
  try {
    const year = await AddYear.findByIdAndDelete(id);
    if (!year) {
      return res.status(404).json({ error: "Year not found" });
    }
    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
 addYear,
 getAllYear,
 deleteYear
};
