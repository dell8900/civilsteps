const UserModel = require("../models/Auth");
const createQuestionModelTopic = require("../models/questionBasedOnSubjectAndTopic");

const getQuestionsBySubjectTopicLevel = async (req, res) => {
 try {
  const { subject, topic, level, user_ID } = req.query;

  if (!subject || !topic || !level) {
   return res
    .status(400)
    .json({ error: "Subject, topic, and level are required" });
  }

  const QuestionModel = createQuestionModelTopic(subject, topic);

  const user = await UserModel.findById(user_ID);
  if (!user) {
   return res.status(404).json({ error: "User not found" });
  }

  // Check user's previous attempts
  const lastAttempt = user.attempts
   .filter((attempt) => attempt.level === level)
   .slice(-1)[0];

  let paperSet = 1;

  if (lastAttempt && !lastAttempt.passed) {
   const failedAttempts = user.attempts.filter(
    (attempt) => attempt.level === level && !attempt.passed
   ).length;

   paperSet = failedAttempts === 1 ? 2 : 3;
  }

  const questions = await QuestionModel.find({ level, paper_set: paperSet });

  if (!questions || questions.length === 0) {
   return res
    .status(404)
    .json({ error: "No questions found for the specified criteria" });
  }

  res.status(200).json(questions);
 } catch (error) {
  console.error("Error fetching questions:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

const getUserLevel = async (req, res) => {
 const { userId } = req.query; // Changed from req.params to req.query
 console.log("userId:", userId);

 try {
  const user = await UserModel.findById(userId);
  if (!user) {
   return res.status(404).json({ error: "User not found" });
  }
  console.log("user:", user.level);
  res.json({ currentLevel: user.level, attempts: user.attempts });
 } catch (error) {
  console.error("Error fetching user level:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

// const submitTest = async (req, res) => {
//   try {
//       const { userId, answers, subject, topic, level } = req.body;

//       const user = await UserModel.findById(userId);
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       const levelAttempts = user.attempts.filter(attempt => attempt.level === level);
//       const lastAttempt = levelAttempts[levelAttempts.length - 1];
//       const nextPaperSet = lastAttempt ? (lastAttempt.paper_set || 1) + 1 : 1;

//       // Ensure nextPaperSet is a valid number
//       if (isNaN(nextPaperSet)) {
//           return res.status(400).json({ error: "Invalid paper set value" });
//       }

//       const QuestionModel = createQuestionModelTopic(subject, topic);
//       const questions = await QuestionModel.find({ level, paper_set: nextPaperSet });

//       if (!questions || questions.length === 0) {
//           return res.status(404).json({ error: "No questions found for this level" });
//       }

//       // Calculate score and update user data
//       let correctAnswers = 0;
//       let detailedQuestions = [];

//       questions.forEach((question, index) => {
//           const isCorrect = question.correctOption === answers[index];
//           if (isCorrect) correctAnswers++;

//           detailedQuestions.push({
//               questionId: question._id,
//               userAnswer: answers[index],
//               isCorrect,
//           });
//       });

//       const totalQuestions = questions.length;
//       const incorrectAnswers = totalQuestions - correctAnswers;
//       const score = (correctAnswers / totalQuestions) * 100;
//       const passed = score >= 50;

//       user.attempts.push({
//           level,
//           questions: detailedQuestions,
//           correctCount: correctAnswers,
//           incorrectCount: incorrectAnswers,
//           passed,
//           paper_set: nextPaperSet
//       });

//       let shouldIncrementLevel = false;

//       if (passed) {
//           // Increment level if passed and current level is less than 3
//           shouldIncrementLevel = user.level < 3;
//       } else {
//           // Check if the user failed twice in a row at the same level
//           const lastTwoAttempts = user.attempts
//               .filter((a) => a.level === level)
//               .slice(-2);

//           const failedTwiceInARow =
//               lastTwoAttempts.length === 2 && lastTwoAttempts.every((a) => !a.passed);

//           if (failedTwiceInARow) {
//               shouldIncrementLevel = user.level < 3;
//           }
//       }

//       if (shouldIncrementLevel) {
//           user.level = await incrementLevel(userId, user.level);
//       }

//       await user.save();

//       const message = passed
//           ? "Congratulations! You can proceed to the next level."
//           : user.level === 3
//               ? "You've reached the highest level! Great job."
//               : "You did not pass. Try again.";

//       res.json({ message, score, passed });
//   } catch (error) {
//       console.error("Error submitting answers:", error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// };
// const incrementLevel = async (userId, currentLevel) => {
//   const nextLevel = currentLevel + 1;
//   try {
//    // Update the user's current level in the database
//    const user = await UserModel.findById(userId);
//    if (!user) {
//     throw new Error("User not found");
//    }

//    user.level = nextLevel; // Increment the level by 1
//    await user.save();
//    console.log(`User's level updated to: ${nextLevel}`);
//    return nextLevel;
//   } catch (error) {
//    console.error("Error updating user's level:", error);
//    throw error;
//   }
//  };
//  ==========================================================================================================================>
const submitTest = async (req, res) => {
 try {
  const { userId, answers, subject, topic, level, currentDate } = req.body;

  const user = await UserModel.findById(userId);
  if (!user) {
   return res.status(404).json({ error: "User not found" });
  }

  const levelAttempts = user.attempts.filter(
   (attempt) => attempt.level === level
  );
  const lastAttempt = levelAttempts[levelAttempts.length - 1];
  const nextPaperSet = lastAttempt ? (lastAttempt.paper_set || 1) + 1 : 1;

  // Ensure nextPaperSet is a valid number
  if (isNaN(nextPaperSet)) {
   return res.status(400).json({ error: "Invalid paper set value" });
  }

  const QuestionModel = createQuestionModelTopic(subject, topic);
  const questions = await QuestionModel.find({
   level,
   paper_set: nextPaperSet,
  });

  if (!questions || questions.length === 0) {
   return res.status(404).json({ error: "No questions found for this level" });
  }

  // Calculate score and update user data
  let correctAnswers = 0;
  let detailedQuestions = [];

  questions.forEach((question, index) => {
   const isCorrect = question.correctOption === answers[index];
   if (isCorrect) correctAnswers++;

   detailedQuestions.push({
    questionId: question._id,
    userAnswer: answers[index],
    isCorrect,
   });
  });

  const totalQuestions = questions.length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const score = (correctAnswers / totalQuestions) * 100;
  const passed = score >= 50;

  user.attempts.push({
   level,
   questions: detailedQuestions,
   correctCount: correctAnswers,
   incorrectCount: incorrectAnswers,
   passed,
   paper_set: nextPaperSet,
   date: currentDate,
   subject: subject,
   topic: topic,
  });

  // Check if the user is attempting this level for the first time
  const firstTimePass = passed && levelAttempts.length === 0;

  // Check consecutive failed attempts for the same level
  const lastAttemptsForLevel = user.attempts.filter((a) => a.level === level);
  const lastTwoAttempts = lastAttemptsForLevel.slice(-2);
  const failedTwiceInARow =
   lastTwoAttempts.length === 2 && lastTwoAttempts.every((a) => !a.passed);

  let shouldIncrementLevel = false;

  if (firstTimePass) {
   // Increment level if passed for the first time
   shouldIncrementLevel = user.level < 3;
  } else if (failedTwiceInARow) {
   // Check if the last two attempts were failures
   shouldIncrementLevel = user.level < 3;
  }

  if (shouldIncrementLevel) {
   user.level = await incrementLevel(userId, user.level);
  }

  await user.save();

  const message = passed
   ? "Congratulations! You can proceed to the next level."
   : user.level === 3
   ? "You've reached the highest level! Great job."
   : "You did not pass. Try again.";

  res.json({ message, score, passed });
 } catch (error) {
  console.error("Error submitting answers:", error);
  res.status(500).json({ error: "Internal server error" });
 }
};

const incrementLevel = async (userId, currentLevel) => {
 const nextLevel = currentLevel + 1;
 try {
  // Update the user's current level in the database
  const user = await UserModel.findById(userId);
  if (!user) {
   throw new Error("User not found");
  }

  // Only increment level if the current level is less than 3
  if (user.level < 3) {
   user.level = nextLevel; // Increment the level by 1
   await user.save();
   console.log(`User's level updated to: ${nextLevel}`);
  }

  return user.level;
 } catch (error) {
  console.error("Error updating user's level:", error);
  throw error;
 }
};

module.exports = {
 getQuestionsBySubjectTopicLevel,
 submitTest,
 getUserLevel,
};
