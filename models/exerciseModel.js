const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: String,
  group: String,
  tags: Array,
  difficulty: String,
  guide: Array,
  demo: Array,
});

module.exports = mongoose.model("Exercise", exerciseSchema);
