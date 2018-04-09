var mongoose = require("../libs/mongoose"),
    renterSchema = mongoose.Schema;

var renterSchema = new mongoose.Schema({
  name:  {
    type: String,
    unique: true
  },
  remember: String,
  // adress: {
  //   city: String,
  //   street: String,
  //   number: Number
  // },
  expiryDate: {
    type: Date,
    default: Date.now
  },
  comments: String
});

renterSchema.methods.reminder = function() {
  console.log("Test reminder: " + this.get("remember"));
}

exports.RenterModel = mongoose.model('Renter', renterSchema);