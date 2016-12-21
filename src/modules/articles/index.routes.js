import express from 'express';
// import controller from './controllers/articles';
import ArticlesService from './controllers/article-helper';
// import session from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  // router.get('/articles', session.auth, controller.all);
  // router.get('/articles/page/:page/limit/:limit', session.auth, controller.pagination);
  // router.post('/articles', session.auth, controller.create);
  // router.route('/articles/:article_id')
  //   .get(session.auth, controller.show)
  //   .put(session.auth, controller.update)
  //   .delete(session.auth, controller.remove);
  // router.param('article_id', controller.model);
  // router.param('page', controller.page);
  // router.param('limit', controller.limit);
  // router.get('/articles', controller.all);
  // router.get('/articles/page/:page/limit/:limit', controller.pagination);
  router.post('/articles', ArticlesService.create);
  // router.route('/articles/:article_id')
  //   .get(controller.show)
  //   .put(controller.update)
  //   .delete(controller.remove);
  // router.param('article_id', controller.model);
  // router.param('page', controller.page);
  // router.param('limit', controller.limit);

  app.use('/v1', router);
};
