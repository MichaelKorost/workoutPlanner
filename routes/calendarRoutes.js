const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getUserCalendarEvents,
  updateUserCalendarEvents,
} = require("../controllers/calendarController");

router.get("/mine", protect, getUserCalendarEvents);
router.put("/mine", protect, updateUserCalendarEvents);

module.exports = router;
