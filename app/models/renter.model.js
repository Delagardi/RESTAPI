const mongoose = require("mongoose");

const RenterSchema = mongoose.Schema({
  name: String,
  adress: String,
  reminders: String,
  comments: String
});

//module.exports = mongoose.Schema("Renter", RenterSchema);
module.exports = mongoose.model('Renter', RenterSchema);

