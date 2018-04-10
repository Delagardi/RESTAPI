const Renter = require("../models/renter.model.js");

// Creating and saving renters
exports.create = (req, res) => {
  
  //Validate request
  if ( !req.body.name ) {
    return res.status(400).send({
      message: "Renter's name can't be empty. Enter renter's name and repeat, please"
    });
  }

  // Creating renter
  const renter = new Renter({
    name: req.body.name,
    adress: req.body.adress,
    reminders: req.body.reminders,
    comments: req.body.comments
  });

  // Saving renter in Database
  renter.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

//Finding all renters
exports.findAll = (req, res) => {
  Renter.find().then(renters => {
    res.send(renters);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

//Finding one renter by ID
exports.findOne = (req, res) => {
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
};

//Update info about renter
exports.update = (req, res) => {
  // Validate Request
  if( !req.body.name ) {
    return res.status(400).send({
      message: "Renter's name can not be empty"
    });
  }

  // Find renter and update it with the request body
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
};

//Delete renter by ID
exports.delete = (req, res) => {
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
};