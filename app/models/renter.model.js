const mongoose = require("mongoose");
const Joi = require('joi');

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
  // userName: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // },
  comments: String
});

const RenterValidationSchema = Joi.object().keys({
    name: Joi.string().min(2).required(),
    adress: Joi.string().required(),
    expiryDate: Joi.date().default(Date.now, 'time of creation').required(), //now for simpicity
    contacts: Joi.string(),
    //userName: 
    comments: Joi.string()
});

//module.exports = mongoose.model("Renter", RenterSchema);

exports.createModel = function() {
  return mongoose.model("Renter", RenterSchema);
}

exports.validationSchema = function() {
  return RenterValidationSchema;
}



