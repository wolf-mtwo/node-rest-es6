import express from 'express';
var controller = require('./controllers/user');

/* GET home page. */
module.exports = (app) => {
  let router = express.Router();
  router.get('/users', controller.all);
  router.post('/users', controller.create);
  router.route('/users/:user_id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.remove);
  router.param('user_id', controller.model);
  app.use('/api/v1', router);
};
