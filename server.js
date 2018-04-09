const express = require("express");
// const mongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const db = require("./config/db");
const application = express();
const port = 4321;

application.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/renters");

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'OUCH! connection error:'));
db.once('open', function() {
  console.log("What do you want master?");
});

var renterSchema = new mongoose.Schema({
  name: String,
  remember: String,
  // adress: {
  //   city: String,
  //   street: String,
  //   number: Number
  // },
  expiryDate: Object,
  comments: String
});

renterSchema.methods.reminder = function() {
  console.log(this.get("remember"))
}

const RenterModel = mongoose.model('Renter', renterSchema);

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

