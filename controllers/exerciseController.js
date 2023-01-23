const Exercise = require("../models/exerciseModel");
const expressAsyncHandler = require("express-async-handler");

// @Desc         Get all exercises
// @Route        GET /api/exercises
// @access       public

const getExercises = expressAsyncHandler(async (req, res) => {
  const exercises = await Exercise.find({});

  res.status(200).json(exercises);
});

module.exports = { getExercises };
