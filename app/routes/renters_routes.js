module.exports = function(application, db) {
  application.post("/renters", (req, res) => {
    // message
    res.send("Hello! You are at RENTERS page!")
  });
};