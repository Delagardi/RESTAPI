const Renter = require("../models/renter.model.js");
const dbOperation = require("../db/db.js");
const Joi = require('joi');
const RenterModel = Renter.createModel();

// Creating and saving renters
exports.create = (req, res) => {
  // Joi validation:
  const result = Joi.validate(req.body, Renter.validationSchema());

  if (result.error) {
    res.status(400).send({
      status: 'err', 
      msg: result.error.details[0].message
    })
    return
  }

  // Creating renter
  const renter = new RenterModel ({
    name: req.body.name,
    adress: req.body.adress,
    expiryDate: req.body.expiryDate,
    contacts: req.body.contacts,
    //userName: req.body.userName,
    comments: req.body.comments
  });

  // Saving renter in Database
  dbOperation.saveDB(renter, res);
};

//Finding all renters
exports.findAll = (req, res) => {
  dbOperation.findAllEntrys(RenterModel, res);
};

//Finding one renter by ID
exports.findOne = (req, res) => {  
  dbOperation.findOneById(RenterModel, req, res);
};

//Update info about renter
exports.update = (req, res) => {
  // Joi validation:
  const result = Joi.validate(req.body, Renter.validationSchema());

  if (result.error) {
    res.status(400).send({
      status: 'err', 
      msg: result.error.details[0].message
    })
    return
  }

  // Find renter and update it with the request body
  dbOperation.updateById(RenterModel, req, res);
};

//Delete renter by ID
exports.delete = (req, res) => {
  dbOperation.deleteById(RenterModel, req, res);
};


