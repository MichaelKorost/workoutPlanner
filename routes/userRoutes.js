const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getMe,
  loginUser,
  registerUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/", getAllUsers);

module.exports = router;
