var ObjectID = require('mongodb').ObjectID;

module.exports = function(application, db) {
  // GET METHOD
  application.get("/renters/:id", (req, res) => {
    const id = req.params.id;
    const details = {"_id": new ObjectID(id)};
    db.collection("renters").findOne(details, (err, item) => {
      if (err) {
        res.send({"error":"We have an error with GET method"});
      } else {
        res.send(item);
      }
    });
  });

  //POST METHOD
  application.post("/renters", (req, res) => {
    //test message console
    //console.log(req.body)
    
    const renter = { company: req.body.company, contacts: req.body.contacts };

    db.collection("renters").insert(renter, (err, result) => {
      //error log
      if (err) {
        res.send({ "error": "We have an error with POST method"});
      } else {
        res.send(result.ops[0]);
      }
    });

    //test message page
    //res.send("Hello! You are at RENTERS page!")
  });
};