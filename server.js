const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");
const application = express();
const port = 4321;

application.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect(db.url, (err, database) => {
  if (err) {
    return console.log(err);
  }

  const rentersDB = database.db('renters');
  require("./app/routes")(application, rentersDB);

  // testing the port listening
  application.listen(port, () => {
    console.log("We are working on the port " + port);
  });
})
