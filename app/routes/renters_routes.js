var ObjectID = require('mongodb').ObjectID;

module.exports = function(application, db) {
  // PUT METHOD
  application.put("/renters/:id", (req, res) => {
    const id = req.params.id;
    const details = {"_id": new ObjectID(id)};
    const renter = {company: req.body.company, contacts: req.body.contacts};

    db.collection("renters").update(details, renter, (err, result) => {
      if (err) {
        res.send({"error":"You get an error with UPDATE method"})
      } else {
        res.send(renter);
      }
    });
  });

  // DELETE METHOD
  application.delete("/renters/:id", (req, res) => {
    const id = req.params.id;
    const details = {"_id": new ObjectID(id)};

    db.collection("renters").remove(details, (err, item) => {
      //error catching
      if (err) {
        res.send({"error":"You get an error with DELETE method"});
      } else {
        res.send("Renter " + id + " deleted.");
      }
    });
  });

  // GET METHOD
  application.get("/renters/:id", (req, res) => {
    const id = req.params.id;
    const details = {"_id": new ObjectID(id)};

    db.collection("renters").findOne(details, (err, item) => {
      //error catching
      if (err) {
        res.send({"error":"You get an error with GET method"});
      } else {
        res.send(item);
      }
    });
  });

  // POST METHOD
  application.post("/renters", (req, res) => {
    const renter = {company: req.body.company, contacts: req.body.contacts};

    db.collection("renters").insert(renter, (err, result) => {
      //error catching
      if (err) {
        res.send({"error": "You get an error with POST method"});
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};