const { date, string, number } = require("joi");
const mongoose = require("mongoose");

const eventCreationSchema = new mongoose.Schema({
  eventId: {
    type: Number,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  numberOfTickets: {
    type: [
      {
        ticketPrice: String,
        ticketType: String,
        id: String,
      },
    ],
    required: true,
  },
});

const eventCreation = mongoose.model("event", eventCreationSchema);

module.exports = eventCreation;
