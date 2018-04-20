const RenterModel = require("../controllers/renter.controller.js");
const User = require('../controllers/user.controller.js');
const Contact = require('../controllers/contact.controller.js');


//-------- RENTERS ---------
module.exports.saveDB = function (renter, res) {
  renter.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findAllEntrys = function(RenterModel, res) {
  RenterModel.find()
  .populate("user", "userName")         //link to column in collection
  .populate("contacts", "contactName")  //link to column in collection
  .exec()
  .then(renters => {
    res.send(renters);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findOneById = function (RenterModel, req, res) {
  RenterModel.findById(req.params.renterId)
  .populate("user")               //link to column in collection
  .populate("contacts")           //link to column in collection
  .exec()
    .then(renter => {
    if( !renter ) {
      return res.status(400).send({
        message: "RenterModel by this ID:" + req.params.renterId + " is not found"
      });
    }

    res.send(renter);
  }).catch(err => {
    return res.status(500).send({
      message: "Error retrieving renter with ID " + req.params.renterId
    });
  });
}

module.exports.updateById = function (RenterModel, req, res) {
  RenterModel.findByIdAndUpdate(req.params.renterId, {
    name: req.body.name,
    adress: req.body.adress,
    expiryDate: req.body.expiryDate,
    contacts: req.body.contacts,
    user: req.body.userid,
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

module.exports.deleteById = function(RenterModel, req, res) {
  RenterModel.findByIdAndRemove(req.params.renterId)
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

//-------- USERS ---------
module.exports.saveDB_user = function (user, res) {
  user.save().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findAllEntrys_user = function(User, res) {
  User.find().then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
}

module.exports.findOneById_user = function (User, req, res) {
  User.findById(req.params.userId).then(user => {
    if( !user ) {
      return res.status(400).send({
        message: "User by this ID:" + req.params.userId + " is not found"
      });
    }
    res.send(user);
  }).catch(err => {
    return res.status(500).send({
      message: "Error retrieving user with ID " + req.params.userId
    });
  });
}

module.exports.updateById_user = function (User, req, res) {
  User.findByIdAndUpdate(req.params.userId, {
    userName: req.body.username,
    userSurname: req.body.usersurname
  }, { new: true })
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send(user);
  }).catch(err => {
    return res.status(500).send({
      message: "Error updating user with id " + req.params.userId
    });
  });
}

module.exports.deleteById_user = function(User, req, res) {
  User.findByIdAndRemove(req.params.userId)
  .then(user => {
    if(!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId
      });
    }
    res.send({message: "User deleted successfully!"});
  }).catch(err => {
    return res.status(500).send({
      message: "Could not delete user with id " + req.params.userId
    });
  });
}