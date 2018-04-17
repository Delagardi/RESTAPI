const mongoose = require("mongoose");
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const RenterSchema = mongoose.Schema({
  name: {
    type: String,
  },
  adress: {
    type: String,
  },
  expiryDate: {
    type: Date,
    default: Date.now, //now for simpicity
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact" //link to model
  }],
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" //link to model
  }],
  comments: String
});

const RenterValidationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    adress: Joi.string().required(),
    expiryDate: Joi.date().default(Date.now, 'time of creation').required(), //.now for simpicity
    contacts: Joi.objectId(),
    user: Joi.objectId(),
    comments: Joi.string()
});

//module.exports = mongoose.model("Renter", RenterSchema);

exports.createModel = function() {
  return mongoose.model("Renter", RenterSchema);
}

exports.validationSchema = function() {
  return RenterValidationSchema;
}



