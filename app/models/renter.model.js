const mongoose = require("mongoose");
const Joi = require('joi');

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
  // userName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  comments: String
});

const renValidSchema = Joi.object().keys({
    name: Joi.string().required(),
    adress: Joi.string().required(),
    expiryDate: Joi.date().required().default(Date.now, 'time of creation'), //now for simpicity
    contacts: Joi.string(),
    //userName: 
    comments: Joi.string()
});

module.exports = mongoose.model("Renter", RenterSchema);


