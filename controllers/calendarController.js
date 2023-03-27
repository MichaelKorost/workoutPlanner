const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");

const CalendarEvent = require("../models/calendarEventModel");

// @desc    Get user calendar events
// @route   GET /api/calendar/mine
// @access  Private

const getUserCalendarEvents = asyncHandler(async (req, res) => {
  const userCalendarEvents = await CalendarEvent.find({ user: req.user._id });
  if (userCalendarEvents.length === 0) {
    throw new Error("no calendar Events were found for this user");
  }
  res.status(200).json(userCalendarEvents);
});

const updateUserCalendarEvents = asyncHandler(async (req, res) => {
  const userCalendarEvents = await CalendarEvent.find({ user: req.user._id });

  // Get the new events from the request body
  const newEvents = req.body.events;

  // Looping through the new events and adding or updating them in the db
  for (const newEvent of newEvents) {
    // Check if the new event has an ID. If it does, update the existing event in the db
    if (newEvent.id) {
      const existingEvent = userCalendarEvents.find(
        (event) => event._id.toString() === newEvent.id
      );

      if (!existingEvent) {
        // If the event does not exist, create a new event in the database
        const calendarEvent = new CalendarEvent({
          user: req.user._id,
          date: newEvent.date,
          title: newEvent.title,
          workout: newEvent.workout,
        });
        await calendarEvent.save();
      } else {
        existingEvent.date = newEvent.date;
        existingEvent.title = newEvent.title;
        existingEvent.workout = newEvent.workout;
        await existingEvent.save();
      }
    } else {
      // If the new event doesn't have an ID, create a new event in the database
      const calendarEvent = new CalendarEvent({
        user: req.user._id,
        date: newEvent.date,
        title: newEvent.title,
        workout: newEvent.workout,
      });
      await calendarEvent.save();
    }
  }

  // Remove events that are not in the new events array
  const eventsToDelete = userCalendarEvents.filter(
    (event) =>
      !newEvents.some((newEvent) => newEvent.id === event._id.toString())
  );
  await CalendarEvent.deleteMany({
    _id: { $in: eventsToDelete.map((event) => event._id) },
  });

  const updatedUserCalendarEvents = await CalendarEvent.find({
    user: req.user._id,
  });

  res.status(200).json(updatedUserCalendarEvents);
});

module.exports = {
  getUserCalendarEvents,
  updateUserCalendarEvents,
};

/*
{
  "events": [
    {
      "id": "event-123",
      "title": "Updated Event Title v2",
      "date": "2022-04-01"
    },
    {
      "id": "event-456",
      "title": "New Event Title",
      "date": "2022-04-02"
    },
    {
      "id": "event-890",
      "title": "newer Event",
      "date": "2022-04-07"
    }
  ]
}
  */
