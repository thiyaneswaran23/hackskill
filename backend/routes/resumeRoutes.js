const router = require("express").Router();
const upload = require("../middleware/uploadMiddleware");
const { parseResume } = require("../controllers/resumeController");

router.post(
  "/parse",
  upload.single("resume"),   // 🔥 THIS LINE WAS MISSING
  parseResume
);

module.exports = router;
