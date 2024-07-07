const { boolean } = require("joi");
const mongoose = require("mongoose");

const userCreationSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  emailId: String,
  password: String,
  category: String,
  verified: Boolean,
});

const UserCreation = mongoose.model("users", userCreationSchema);

module.exports = UserCreation;
