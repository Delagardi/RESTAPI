const rentersRoutes = require("./renters_routes.js");

module.exports = function(application, db) {
  rentersRoutes(application, db);
};