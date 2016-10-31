import express from 'express';
var controller = require('./controllers/articles');
var session = require('../../components/session');

module.exports = (app) => {

  let router = express.Router();
  router.get('/articles', session.auth, controller.all);
  router.post('/articles', session.auth, controller.create);
  router.route('/articles/:article_id')
    .get(session.auth, controller.show)
    .put(session.auth, controller.update)
    .delete(session.auth, controller.remove);
  router.param('article_id', controller.model);

  app.use('/api/v1', router);
};
