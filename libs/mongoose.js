const mongoose = require("mongoose");
//const config = require("../config");

const uriDB = "mongodb://localhost/renters"

mongoose.connect("uriDB");

module.exports = mongoose;