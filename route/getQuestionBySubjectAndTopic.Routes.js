const express = require("express");
const {
  addQuestionToDatabase,
  getQuestionsBySubjectAndTopic,
  getAll,
  editQuestionInDatabase,
  getQuestionById,
  deleteQuestionFromDatabase,
  // getQuestionsBySubjectTopicLevel,
} = require("../controller/getSubjctAndTopic");
const getQuestionBySubjectAndTopicRouter = express.Router();

getQuestionBySubjectAndTopicRouter.get(
  "/:subject/:topic",
  getQuestionsBySubjectAndTopic
);
// getQuestionBySubjectAndTopicRouter.get(
//   "/questions",
//   getQuestionsBySubjectTopicLevel
// );

getQuestionBySubjectAndTopicRouter.post(
  "/questions/:subject/:topic",
  addQuestionToDatabase
);

getQuestionBySubjectAndTopicRouter.get("/get-all-questions", getAll);

getQuestionBySubjectAndTopicRouter.get(
  "/questions/:subject/:topic/:id",
  getQuestionById
);

getQuestionBySubjectAndTopicRouter.put(
  "/questions/:subject/:topic/:questionId",
  editQuestionInDatabase
);
getQuestionBySubjectAndTopicRouter.delete(
  "/questions/:subject/:topic/:questionId",
  deleteQuestionFromDatabase
);

module.exports = getQuestionBySubjectAndTopicRouter;
