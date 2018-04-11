module.exports.saveDB = function (renter, res) {
  renter.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });

  console.log("Data is saved");
}