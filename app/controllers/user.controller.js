const User = require("../models/user.model.js");
const dbOperation = require("../db/db.js");

// Creating and saving renters
exports.create = (req, res) => {
  
  //Validate request
  if ( !req.body.name ) {
    return res.status(400).send({
      message: "User have not the name. Enter renter's name and repeat, please"
    });
  }

  // Creating User
  const user = new User({
    userName: req.body.username,
    userSurname: req.body.usersurname
  });

  // Saving renter in Database
  dbOperation.saveDB(user, res);
};

//Finding all renters
exports.findAll = (req, res) => {
  dbOperation.findAllEntrys(User, res);
};

//Finding one renter by ID
exports.findOne = (req, res) => {  
  dbOperation.findOneById(User, req, res);
};

//Update info about renter
exports.update = (req, res) => {
  // Validate Request
  if( !req.body.name ) {
    return res.status(400).send({
      message: "User's name can not be empty"
    });
  }

  // Find renter and update it with the request body
  dbOperation.updateById(User, req, res);
};

//Delete renter by ID
exports.delete = (req, res) => {
  dbOperation.deleteById(User, req, res);
};