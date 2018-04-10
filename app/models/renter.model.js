const mongoose = require("mongoose");

const RenterSchema = mongoose.Schema({
  name: String,
  // adress: {
  //   city: String,
  //   street: String,
  //   number: Number
  // },
  adress: String,
  // // expiryDate: {
  // //   type: Date,
  // //   default: Date.now
  // // },
  reminders: String,
  comments: String
});

//module.exports = mongoose.Schema("Renter", RenterSchema);
module.exports = mongoose.model('Renter', RenterSchema);

