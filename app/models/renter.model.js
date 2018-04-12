const mongoose = require("mongoose");

//("56cb91bdc3464f14678934ca")

// const UserSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   userName: String,
//   userSurname: String,
//   renters: [{ 
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Renter"
//   }]
// });

const RenterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  adress: String,
  userName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  //reminders: String,
  comments: String
});

//module.exports = mongoose.Schema("Renter", RenterSchema);
//var Renter = mongoose.model("Renter", RenterSchema);
//var User = mongoose.model("User", UserSchema);
module.exports = mongoose.model("Renter", RenterSchema);
//module.exports = mongoose.model("User", UserSchema);

