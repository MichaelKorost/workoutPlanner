const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getMe,
  loginUser,
  registerUser,
  updateUserName,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);

router.route("/me").get(protect, getMe).put(protect, updateUserName);

module.exports = router;
