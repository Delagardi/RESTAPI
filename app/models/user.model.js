const mongoose = require("mongoose");

//("56cb91bdc3464f14678934ca")

const UserSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  userName: String,
  userSurname: String,
  renters: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Renter"
  }]
});

module.exports = mongoose.model("User", UserSchema);

