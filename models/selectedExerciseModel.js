const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { Exercise, exerciseSchema } = require("./exerciseModel");

const selectedExerciseSchema = new Schema({
  exercise: exerciseSchema,
  sets: Number,
  reps: Number,
  weight: Number,
});

const SelectedExercise = mongoose.model(
  "SelectedExercise",
  selectedExerciseSchema
);
module.exports = { SelectedExercise, selectedExerciseSchema };
