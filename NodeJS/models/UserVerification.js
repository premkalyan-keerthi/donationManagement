const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserVerificationSchema = new mongoose.Schema({
    userId : String,
    uniqueString : String,
    createdAt: Date,
    expiresAt: Date,
    category : String,
    verified : Boolean,

})

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema); 

module.exports = UserVerification;