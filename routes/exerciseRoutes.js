const express = require("express");

const router = express.Router();
const {
  getExercises,
  getExercisesByGroup,
  getExercisesByTags,
  getExercisesByDifficuly,
  getExercisesByName,
  getExercisesBySearch,
} = require("../controllers/exerciseController");

router.get("/", getExercises);
router.get("/group/:group", getExercisesByGroup);
router.get("/tags/:tag", getExercisesByTags);
router.get("/difficulty/:difficulty", getExercisesByDifficuly);
router.get("/name/:name", getExercisesByName);
router.get("/search", getExercisesBySearch);

module.exports = router;
