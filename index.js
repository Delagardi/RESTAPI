const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");
const application = express();
const port = 4321;

application.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect(db.url, (err, database) => {
  const rentersDB = database.db('renters');
  rentersDB.collection("rentersName");

  if (err) {
    return console.log(err);
  }

  require("./app/routes")(application, database);

  // testing the port listening
  application.listen(port, () => {
    console.log("We are working on the port " + port);
  });
})




