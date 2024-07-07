const Joi = require("joi");
const { date, string, number } = require("joi");
const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  _id: {
    type: Joi.string(),
  },
  eventId: {
    type: Number,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  numberOfTickets: {
    type: [
      {
        ticketPrice: String,
        ticketType: String,
        ticketsPurchased: String,
        id: String,
      },
    ],
    required: true,
  },
});

const Ticket = mongoose.model("ticket", TicketSchema);

module.exports = Ticket;
