module.exports = (application) => {
  const users = require('../controllers/user.controller.js');

  // POST METHOD (add user)
  application.post('/users', users.create_user);

  // GET METHOD (show all users)
  application.get('/users', users.findAll_user);

  // GET METHOD (show one user)
  application.get('/users/:userId', users.findOne_user);

  // PUT METHOD (update info about user)
  application.put('/users/:userId', users.update_user);

  // DELETE METHOD (delete user)
  application.delete('/users/:userId', users.delete_user);
}