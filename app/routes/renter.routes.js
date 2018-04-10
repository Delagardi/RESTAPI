module.exports = (application) => {
  const renters = require('../controllers/renter.controller.js');

  // POST METHOD (add renter)
  application.post('/renters', renters.create);

  // GET METHOD (show all renters)
  application.get('/renters', renters.findAll);

  // GET METHOD (show one renter)
  application.get('/renters/:renterId', renters.findOne);

  // PUT METHOD (update info about renter)
  application.put('/renters/:renterId', renters.update);

  // DELETE METHOD (delete renter)
  application.delete('/renters/:renterId', renters.delete);
}