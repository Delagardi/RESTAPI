module.exports.saveDB = function (renter, user, res) {
  renter.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findAllEntrys = function(Renter, res) {
  Renter.find().then(renters => {
    res.send(renters);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findOneById = function (Renter, req, res) {
  Renter.findById(req.params.renterId).then(renter => {
    if( !renter ) {
      return res.status(400).send({
        message: "Renter by this ID:" + req.params.renterId + " is not found"
      });
    }
    res.send(renter);
  }).catch(err => {
    return res.status(500).send({
      message: "Error retrieving renter with ID " + req.params.renterId
    });
  });
}

module.exports.updateById = function (Renter, req, res) {
  Renter.findByIdAndUpdate(req.params.renterId, {
    name: req.body.name,
    adress: req.body.adress,
    reminders: req.body.reminders,
    comments: req.body.comments
  }, { new: true })
  .then(renter => {
    if(!renter) {
      return res.status(404).send({
        message: "Renter not found with id " + req.params.renterId
      });
    }
    res.send(renter);
  }).catch(err => {
    return res.status(500).send({
      message: "Error updating renter with id " + req.params.renterId
    });
  });
}

module.exports.deleteById = function() {
  Renter.findByIdAndRemove(req.params.renterId)
  .then(renter => {
    if(!renter) {
      return res.status(404).send({
        message: "Renter not found with id " + req.params.renterId
      });
    }
    res.send({message: "Renter deleted successfully!"});
  }).catch(err => {
    return res.status(500).send({
      message: "Could not delete renter with id " + req.params.renterId
    });
  });
}