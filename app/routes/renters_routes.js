module.exports = function(application, db) {
  application.post("/renters", (req, res) => {
    //test message console
    console.log(req.body)
    const renter = { text: req.body.body, title: req.body.title };

    db.collection("renters").insert(renter, (err, result) => {
      //error log
      if (err) {
        res.send({ "error": "We have an error"});
      } else {
        res.send(result.ops[0]);
      }
    });

    //test message page
    //res.send("Hello! You are at RENTERS page!")
  });
};