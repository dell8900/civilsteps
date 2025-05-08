const express = require("express");
const { TestResult } = require("../models/ScoreBoard");
const router = express.Router();
const moment = require("moment-timezone");
router.post("/test-results", async (req, res) => {
 try {
  const {
   userId,
   score,
   questionsAttempted,
   correctAnswers,
   wrongAnswers,
   totalNosQues,
   category,
  } = req.body;

  const newTestResult = new TestResult({
   user: userId,
   score,
   questionsAttempted,
   correctAnswers,
   wrongAnswers,
   totalNosQues,
   category,
   submissionTime: new Date(),
  });

  await newTestResult.save();

  res.status(201).json({ message: "Test result added successfully" });
 } catch (error) {
  console.error("Error adding test result:", error);
  res.status(500).json({ error: "Internal server error" });
 }
});

router.get("/test-results/:userId", async (req, res) => {
 try {
  const userId = req.params.userId;

  const testResults = await TestResult.find({ user: userId });

  if (testResults.length > 0) {
   const formattedResults = testResults.map((result) => ({
    ...result._doc,
    submissionTime: formatDate(result.submissionTime),
   }));

   res.status(200).json(formattedResults);
  } else {
   res.status(404).json({ message: "Test results not found for the user" });
  }
 } catch (error) {
  console.error("Error fetching test results:", error);
  res.status(500).json({ error: "Internal server error" });
 }
});
router.get("/test-results/:userId/latest", async (req, res) => {
 try {
  const userId = req.params.userId;

  const latestResult = await TestResult.findOne({ user: userId })
   .sort({ submissionTime: -1 })
   .limit(1);

  if (latestResult) {
   const formattedResult = {
    ...latestResult._doc,
    submissionTime: formatDate(latestResult.submissionTime),
   };

   res.status(200).json(formattedResult);
  } else {
   res
    .status(404)
    .json({ message: "Latest test result not found for the user" });
  }
 } catch (error) {
  console.error("Error fetching latest test result:", error);
  res.status(500).json({ error: "Internal server error" });
 }
});

function formatDate(date) {
 const localDate = new Date(date);

 const formattedDate = localDate.toLocaleDateString(undefined, {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
 });

 const formattedTime = localDate.toLocaleTimeString(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
 });

 return `${formattedDate} ${formattedTime}`;
}

module.exports = router;
