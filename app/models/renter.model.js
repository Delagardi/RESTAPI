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
  contacts: String,
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: String
});

//const RenterValidationSchema = Joi.object().keys({
const RenterValidationSchema = Joi.object({
    name: Joi.string().min(2).required(),
    adress: Joi.string().required(),
    expiryDate: Joi.date().default(Date.now, 'time of creation').required(), //now for simpicity
    contacts: Joi.string(),
    user: Joi.objectId(),
              // .keys({
              //   _id: Joi.objectId().required()
              // }).optional(),
    comments: Joi.string()
});

 // department: Joi.object()
  //   .keys({
  //     name: Joi.string(),
  //     _id: Joi.objectId().required()
  //   }).optional()

//module.exports = mongoose.model("Renter", RenterSchema);

exports.createModel = function() {
  return mongoose.model("Renter", RenterSchema);
}

exports.validationSchema = function() {
  return RenterValidationSchema;
}



