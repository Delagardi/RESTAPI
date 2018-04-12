module.exports = (application) => {
  const users = require('../controllers/user.controller.js');

  // POST METHOD (add user)
  application.post('/users', users.create);

  // GET METHOD (show all users)
  application.get('/users', users.findAll);

  // GET METHOD (show one user)
  application.get('/users/:userId', users.findOne);

  // PUT METHOD (update info about user)
  application.put('/users/:userId', users.update);

  // DELETE METHOD (delete user)
  application.delete('/users/:userId', users.delete);
}