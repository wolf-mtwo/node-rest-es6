import express from 'express';
import { Service } from './services/service';
import { SessionService } from '../../components/session/services/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/articles', SessionService.auth, Service.query);
  router.get(
    '/articles/page/:page/limit/:limit', SessionService.auth, Service.pagination
  );
  router.post('/articles',SessionService.auth,  Service.create);
  router.route('/articles/:article_id')
  .get(SessionService.auth, Service.show)
  .put(SessionService.auth, Service.update)
  .delete(SessionService.auth, Service.remove);
  router.param('page', Service.page);
  router.param('limit', Service.limit);
  router.param('article_id', Service.load);
  app.use('/v1', router);
};
