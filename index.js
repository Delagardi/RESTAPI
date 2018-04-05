const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const application = express();
const port = 4321;

require("./app/routes")(application, {});

// testing the port listening
application.listen(port, () => {
  console.log("We are working on the port " + port);
});