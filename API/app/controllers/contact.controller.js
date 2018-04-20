const Contact = require("../models/contact.model.js");
const dbOperation = require("../db/db.js");

//For manual adding ID field:
//const mongoose = require("mongoose"); 

// Creating and saving renters
exports.create_contact = (req, res) => {
  
  //Validate request
  if ( !req.body.contactname ) {
    return res.status(400).send({
      message: "Contact have not the name. Enter renter's name and repeat, please"
    });
  }

  

  // Creating Contact
  const contact = new Contact({
    contactName: req.body.contactname,
    contactSurname: req.body.contactsurname
  });

  // Saving renter in Database
  dbOperation.saveDB_contact(contact, res);
};

//Finding all renters
exports.findAll_contact = (req, res) => {
  dbOperation.findAllEntrys_contact(Contact, res);
};

//Finding one renter by ID
exports.findOne_contact = (req, res) => {  
  dbOperation.findOneById_contact(Contact, req, res);
};

//Update info about renter
exports.update_contact = (req, res) => {
  // Validate Request
  if( !req.body.contactname ) {
    return res.status(400).send({
      message: "Contact's name can not be empty"
    });
  }

  // Find renter and update it with the request body
  dbOperation.updateById_contact(Contact, req, res);
};

//Delete renter by ID
exports.delete_contact = (req, res) => {
  dbOperation.deleteById_contact(Contact, req, res);
};