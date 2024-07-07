const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const app = require("./app");
const dotenv = require("dotenv");

const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const username = "yaswanth123";
const password = "yaswanth123";
const atls_url = `mongodb+srv://${username}:${password}@cluster1.jbudlrb.mongodb.net/Donors?retryWrites=true&w=majority`;

mongoose
  .connect(atls_url)
  .then(() => {
    console.log("Connected to Cloud MongoDB ATLAS");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(port, "localhost", "", () => {
  console.log("listening on 8080");
});
