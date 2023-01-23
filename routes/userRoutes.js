const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getMe,
  loginUser,
  registerUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.get("/", getAllUsers);

module.exports = router;
