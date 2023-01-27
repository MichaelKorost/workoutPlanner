const express = require("express");

const router = express.Router();
const {
  createWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan,
} = require("../controllers/workoutPlanController");

router.post("/create", createWorkoutPlan);
router.get("/", getWorkoutPlans);
router.route("/:id").put(updateWorkoutPlan).delete(deleteWorkoutPlan);

module.exports = router;
