import express from 'express';
import controller from './service';
import session from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/users', controller.query);
  router.post('/users', controller.create);
  router.route('/users/:user_id')
    .get(controller.show)
    .put(controller.update)
    .delete(controller.remove);
  router.param('user_id', controller.load);

  router.post('/login', session.login);
  app.use('/v1', router);

  let routerAuth = express.Router();
  routerAuth.post('/logout', session.auth, session.logout);
  app.use('/v1', routerAuth);
};
