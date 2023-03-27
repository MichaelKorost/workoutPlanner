const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarEventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  date: String,
  id: String,
  title: String,
  workout: Object,
});

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);
