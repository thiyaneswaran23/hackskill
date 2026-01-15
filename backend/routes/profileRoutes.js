const express = require("express");
const router = express.Router();
const { saveProfile } = require("../controllers/profileController"); // ✅ destructure
const protect  = require("../middleware/authMiddleware");

// Only authenticated users can save/update profile
router.post("/save", protect, saveProfile);

module.exports = router;
