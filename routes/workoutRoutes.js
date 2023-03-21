const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getUserWorkoutPlans,
  getWorkoutPlanById,
} = require("../controllers/workoutPlanController");

router.post("/create", protect, createWorkoutPlan);
router.get("/my", protect, getUserWorkoutPlans);
router.get("/", getWorkoutPlans);
router
  .route("/:id")
  .put(protect, updateWorkoutPlan)
  .delete(protect, deleteWorkoutPlan)
  .get(getWorkoutPlanById);

module.exports = router;
