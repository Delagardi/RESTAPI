const express = require("express");
const bodyParser = require("body-parser");
const application = express();

application.use(bodyParser.urlencoded({ extended: true }));

application.use(bodyParser.json());

//Cross-Origin Resource Sharing (CORS)
application.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

const dbConfig = require("./config/dbconfig.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url).then(() => {
  console.log("Everything ok. Database connection fine");
}).catch(err => {
  console.log("I COULD NOT CONNECT TO THE DATABASE");
  process.exit();
});



//Define route
application.get("/", (req, res) => {
  res.json({
    "message":"Welcome to renters application"
  });
});

require("./app/routes/renter.routes.js")(application);
require("./app/routes/user.routes.js")(application);

console.log(__dirname);

application.listen(4321, () => {
  console.log("I am ready");
});
