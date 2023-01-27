// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const SelectedExercise = require("./selectedExerciseModel");

// const workoutPlanSchema = new Schema({
//   title: String,
//   plan: [
//     {
//       muscleGroup: String,
//       exercises: [SelectedExercise.selectedExerciseSchema],
//     },
//   ],
// });

// module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);

const {
  SelectedExercise,
  selectedExerciseSchema,
} = require("./selectedExerciseModel");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema({
  title: String,
  plan: [
    {
      muscleGroup: String,
      exercises: [selectedExerciseSchema],
    },
  ],
});

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
