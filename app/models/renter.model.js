const mongoose = require("mongoose");
//const Joi = require('joi');

const RenterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    default: Date.now, //now for simpicity
    required: true
  },
  contacts: String,
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  comments: String
});

module.exports = mongoose.model("Renter", RenterSchema);


