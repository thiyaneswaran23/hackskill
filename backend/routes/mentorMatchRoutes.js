const express = require("express");
const router = express.Router();

const { getRecommendedMentors } = require("../controllers/mentorMatchController");
const auth = require("../middleware/authMiddleware");

// AI mentor recommendations
router.get("/recommendations", auth, getRecommendedMentors);

module.exports = router;
