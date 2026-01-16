const express = require("express");
const router = express.Router();
const {
  saveProfile,
  getMyProfile
} = require("../controllers/profileController");
const protect = require("../middleware/authMiddleware");

// Only authenticated users can save/update profile
router.post("/save", protect, saveProfile);
router.get("/me", protect, getMyProfile);

module.exports = router;
