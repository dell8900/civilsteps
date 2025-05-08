// routes/testRoutes.js
const express = require("express");
const {
 getQuestionsBySubjectTopicLevel,
 submitTest,
 getUserLevel,
 test,
} = require("../controller/paidTestController");
const {
 authenticateToken,
 checkPremium,
} = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
 "/questions",
 authenticateToken,
 checkPremium,
 getQuestionsBySubjectTopicLevel
);
router.post("/submit", authenticateToken, checkPremium, submitTest);
router.get("/levels", getUserLevel);
// router.get("/test/level", test);

module.exports = router;
