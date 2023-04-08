const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// TODO: isFav

const exerciseSchema = new Schema({
  name: String,
  image: String,
  group: String,
  tags: Array,
  difficulty: String,
  guide: Array,
  demo: Array,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = { Exercise, exerciseSchema };
