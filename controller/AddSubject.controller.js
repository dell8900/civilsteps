// subjectController.js

const AddSubject = require("../models/SubjectBy.model");

const addSubject = (req, res) => {
 const { name, description } = req.body;

 const newSubject = new AddSubject({
  name,
  description,
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

const getAllSubjects = async (req, res) => {
 try {
  const subjects = await AddSubject.find();
  res.status(200).json(subjects);
  console.log("hello");
 } catch (error) {
  res.status(500);
 }

 //  AddSubject.find()
 //   .then((subjects) => {
 //    res.status(200).json(subjects);
 //   })
 //   .catch((error) => {
 //    res.status(500).json({ error: error.message });
 //   });
};
const deleteSubject = async (req, res) => {
 const { id } = req.params;
 try {
  const subject = await AddSubject.findByIdAndDelete(id);
  if (!subject) {
   return res.status(404).json({ error: "Subject not found" });
  }
  res.status(200).json({ message: "Subject deleted successfully" });
 } catch (error) {
  console.error("Error deleting subject:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

module.exports = {
 addSubject,
 getAllSubjects,
 deleteSubject,
};
