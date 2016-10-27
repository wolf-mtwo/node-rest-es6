import express from 'express';
var controller = require('./controllers/articles');

module.exports = (app) => {

  let router = express.Router();
  router.get('/articles', controller.all);
  router.post('/articles', controller.create);
  router.route('/articles/:article_id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.remove);
  router.param('article_id', controller.model);

  app.use('/api/v1', router);
};
