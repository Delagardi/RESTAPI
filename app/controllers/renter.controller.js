const Renter = require("../models/renter.model.js");
const dbOperation = require("../db/db.js");
const Joi = require('joi');

// Creating and saving renters
exports.create = (req, res) => {
  const result = Joi.validate(req.body, Joi.object().keys(Renter.validationSchema));

  if (result.error) {
    res.status(400).send({
      status: 'err', 
      msg: result.error.details[0].message
    })
    return
  }

  // Creating renter
  const renter = new Renter({
    name: req.body.name,
    adress: req.body.adress,
    expiryDate: req.body.expirydate,
    contacts: req.body.contacts,
    //userName: req.body.username,
    comments: req.body.comments
  });

  // Saving renter in Database
  dbOperation.saveDB(renter, res);
};

//Finding all renters
exports.findAll = (req, res) => {
  dbOperation.findAllEntrys(Renter, res);
};

//Finding one renter by ID
exports.findOne = (req, res) => {  
  dbOperation.findOneById(Renter, req, res);
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
  dbOperation.updateById(Renter, req, res);
};

//Delete renter by ID
exports.delete = (req, res) => {
  dbOperation.deleteById(Renter, req, res);
};


