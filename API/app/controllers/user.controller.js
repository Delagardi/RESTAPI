const User = require("../models/user.model.js");
const dbOperation = require("../db/db.js");

//For manual adding ID field:
//const mongoose = require("mongoose"); 

// Creating and saving renters
exports.create_user = (req, res) => {
  
  //Validate request
  if ( !req.body.username ) {
    return res.status(400).send({
      message: "User have not the name. Enter renter's name and repeat, please"
    });
  }

  

  // Creating User
  const user = new User({
    userName: req.body.username,
    userSurname: req.body.usersurname
  });

  // module.exports = 
  // //For manual adding ID field:
  // user._id = mongoose.Types.ObjectId('000000000000000000000001');

  // Saving renter in Database
  dbOperation.saveDB_user(user, res);
};

//Finding all renters
exports.findAll_user = (req, res) => {
  dbOperation.findAllEntrys_user(User, res);
};

//Finding one renter by ID
exports.findOne_user = (req, res) => {  
  dbOperation.findOneById_user(User, req, res);
};

//Update info about renter
exports.update_user = (req, res) => {
  // Validate Request
  if( !req.body.username ) {
    return res.status(400).send({
      message: "User's name can not be empty"
    });
  }

  // Find renter and update it with the request body
  dbOperation.updateById_user(User, req, res);
};

//Delete renter by ID
exports.delete_user = (req, res) => {
  dbOperation.deleteById_user(User, req, res);
};