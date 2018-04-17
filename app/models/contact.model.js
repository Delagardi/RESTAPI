const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  contactName: String,
  contactSurname: String,
  contactEmail: String,
  contactComment: String,
  renters: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Renter" //link to model
  }]
});

module.exports = mongoose.model("Contact", ContactSchema);

