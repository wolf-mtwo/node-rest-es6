import express from 'express';
import Service from './service/service';

module.exports = (app) => {
  let router = express.Router();
  // TODO it works with auth
  // router.get('/articles', session.auth, Service.all);

  router.get('/articles', Service.query);
  router.get('/articles/page/:page/limit/:limit', Service.pagination);
  router.post('/articles', Service.create);
  router.route('/articles/:article_id')
  .get(Service.show)
  .put(Service.update)
  .delete(Service.remove);
  router.param('page', Service.page);
  router.param('limit', Service.limit);
  router.param('article_id', Service.load);
  app.use('/v1', router);
};
