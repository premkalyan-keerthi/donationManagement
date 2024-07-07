const express = require("express");
const app = express();

// Import routes
const mainRouter = require("./Router.js");

//Router MIddlewares
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

app.use(express.json());
app.use("/", mainRouter);

module.exports = app;
