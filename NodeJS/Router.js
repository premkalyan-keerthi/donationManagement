const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
//mongodb user module
const UserCreation = require("./models/UserCreation.js");

//mongodb userVerification module
const userVerification = require("./models/UserVerification.js");

//ticket
const Ticket = require("./models/Ticket.js");

//email handler
const nodemailer = require("nodemailer");

//unique string
const { v4: uuidv4 } = require("uuid");

//password handler
const bcrypt = require("bcrypt");

// event
const Event = require("./models/eventCreation.js");

//crypto
const crypto = require("crypto");
const UserVerification = require("./models/UserVerification.js");
const { error } = require("console");
const { async } = require("q");
const eventCreation = require("./models/eventCreation.js");
const productSchema = require("./models/Products.js");
const { cartSchema, Cart } = require("./models/Cart.js");

//env variables
require("dotenv").config();

//nodemailer transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// testing
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("ready for messages");
    console.log("success");
  }
});

router.post("/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const emailId = req.body.emailId;
  const password = req.body.password;
  const category = req.body.category;

  const user = new UserCreation({
    firstName: firstName,
    lastName: lastName,
    emailId: emailId,
    password: password,
    category: category,
  });

  const newUser = await user.save();

  if (newUser) {
    return res.status(200).send({
      code: 200,
      message: "An email has been sent to your account",
    });
  } else {
    return res.send({ code: 500, message: "service error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password, category } = req.body;
    let user = await UserCreation.findOne({ emailId });
    console.log(req.body, "check", user.password);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = !!(user.password === password);

    console.log(validPassword, "???");

    if (!validPassword) {
      return res.status(400).send("Please enter a valid password.");
    }

    const validCategory = await UserCreation.findOne({ category });

    if (!validCategory) {
      return res.status(404).send("Category not matching");
    }
    res.status(200).send("Login Successful");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

//event creation
router.post("/eventcreation", async (req, res) => {
  const eventId = req.body.eventId;
  const eventTitle = req.body.eventTitle;
  const createdAt = req.body.createdAt;
  const eventDescription = req.body.eventDescription;
  const eventLocation = req.body.eventLocation;
  const numberOfTickets = req.body.numberOfTickets;

  const event = new eventCreation({
    eventId: eventId,
    eventTitle: eventTitle,
    createdAt: createdAt,
    eventDescription: eventDescription,
    eventLocation: eventLocation,
    numberOfTickets: numberOfTickets,
  });

  const newEvent = await event.save();

  if (newEvent) {
    return res.status(200).send({
      code: 200,
      message: "New Event has been created",
    });
  } else {
    return res.send({ code: 500, message: "service error" });
  }
});

//event update
router.put("/editEvent/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const updateData = req.body;

  const updateEventSchema = Joi.object({
    _id: Joi.string(),
    eventTitle: Joi.string(),
    eventDescription: Joi.string(),
    eventId: Joi.number(),
    numberOfTickets: Joi.array().items(
      Joi.object({
        ticketPrice: Joi.string(),
        ticketType: Joi.string(),
        id: Joi.string(),
        _id: Joi.string(),
      })
    ),
  });

  //validating the request body
  const { error } = updateEventSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // Find the event by eventId
    const event = await Event.findOne({ eventId });
    event.set(updateData);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Save the updated event
    await event.save();

    return res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent: event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//event delete
router.delete("/eventDelete/:eventId", async (req, res) => {
  const { eventId } = req.params;

  try {
    // Find the event by eventId
    const event = await Event.findOne({ eventId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Delete the event
    await event.deleteOne();
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/browseEvent", async (req, res) => {
  try {
    const events = await eventCreation.find(
      {},
      "eventId eventTitle eventDescription numberOfTickets"
    );
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });

    const newEvent = await event.save();

    if (newEvent) {
      return res.status(200).send({
        code: 200,
        message: "New Event has been created",
      });
    } else {
      return res.send({ code: 500, message: "service error" });
    }
  }
});

router.get("/browseEvent", async (req, res) => {
  try {
    const events = await eventCreation.find(
      {},
      "eventId eventTitle eventDescription numberOfTickets"
    );
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/productsList", async (req, res) => {
  try {
    const products = await productSchema.find(
      {},
      "productName productDescription productRate productImageLink"
    );
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// cart
router.post("/addcart", async (req, res) => {
  const products = req.body.products;
  const agency = req.body.agency;

  const cart = new Cart({
    products: products,
    agency: agency,
  });

  const newCart = await cart.save();

  if (newCart) {
    return res.status(200).send({
      code: 200,
      message: "New Cart has been created",
    });
  } else {
    return res.send({ code: 500, message: "service error" });
  }
});

//report
router.get("/report", async (req, res) => {
  try {
    const carts = await Cart.find({}, "products agency");
    const reports = [];
    carts.forEach((cart) => {
      const reportProducts = cart.products.filter(
        (product) => product.price > 200
      );
      if (reportProducts.length) {
        reports.push({
          agency: cart.agency,
          products: reportProducts,
        });
      }
    });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//tickets purchased
router.post("/addTickets", async (req, res) => {
  // const _id = req.body._id;
  const eventId = req.body.eventId;
  const eventTitle = req.body.eventTitle;
  const eventDescription = req.body.eventDescription;
  const numberOfTickets = req.body.numberOfTickets;

  const ticket = new Ticket({
    _id: parseFloat(Math.random(0, 100000)) * 100000,
    eventId: eventId,
    eventTitle: eventTitle,
    eventDescription: eventDescription,
    numberOfTickets: numberOfTickets,
  });

  const newTicket = await ticket.save();
  if (newTicket) {
    return res.status(200).send({
      code: 200,
      message: "New Ticket has been booked",
    });
  } else {
    return res.send({ code: 500, message: "service error" });
  }
});

//ticket report
router.get("/ticketsBooked", async (req, res) => {
  try {
    const tickets = await Ticket.find(
      {},
      "eventId eventTitle eventDescription numberOfTickets"
    );
    const reports = [];
    tickets.forEach((ticket) => {
      console.log(ticket, "???");
      const reportTickets = ticket.numberOfTickets.filter(
        (ticket) => ticket.ticketPrice * ticket.ticketsPurchased >= 200
      );
      if (reportTickets.length) {
        reports.push({
          eventTitle: ticket.eventTitle,
          eventDescription: ticket.eventDescription,
          reportTickets,
        });
      }
    });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
