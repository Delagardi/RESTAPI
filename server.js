const express = require("express");
const bodyParser = require("body-parser");
const application = express();

application.use(bodyParser.urlencoded({ extended: true }));

application.use(bodyParser.json());

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

application.listen(3000, () => {
  console.log("I am ready");
});

