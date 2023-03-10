const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getUserWorkoutPlans,
} = require("../controllers/workoutPlanController");

router.post("/create", protect, createWorkoutPlan);
router.get("/my", protect, getUserWorkoutPlans);
router.get("/", getWorkoutPlans);
router.route("/:id").put(updateWorkoutPlan).delete(deleteWorkoutPlan);

module.exports = router;
