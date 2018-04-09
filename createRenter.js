const mongoose = require("mongoose"), renterSchema = mongoose.Schema;
const Renter = require("./models/renterModel.js").Renter;


// var renter = new Renter({
//   name: "Anton Anton",
//     // adress: {
//     //   city: "Kyiv", 
//     //   street: "Bolsynovska", 
//     //   number: 14
//     // },
//     remember: "Reminder me",
//     comments: "Veni vidi vici"
// });

const RenterModel = mongoose.model('Renter');

const renter = new RenterModel({
    name: "Dimm Dima",
    // adress: {
    //   city: "Kyiv", 
    //   street: "Bolsynovska", 
    //   number: 14
    // },
    remember: "Take his money",
    comments: "Good guy"
  }
);

renter.save(function(err, renter, affected) {
  console.log(arguments);
  console.log(renter.name);
  console.log(renter.adress);
  renter.reminder();
  console.log(renter.comments);
});