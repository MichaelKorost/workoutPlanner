const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a schema for the users collection
const testSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = mongoose.model("Test", testSchema);
