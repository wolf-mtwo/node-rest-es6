import express from 'express';
import { Service } from './service';
import session from '../../components/session';

module.exports = (app) => {
  let router = express.Router();
  router.get('/users', Service.query);
  router.post('/users', Service.create);
  router.route('/users/:user_id')
    .get(Service.show)
    .put(Service.update)
    .delete(Service.remove);
  router.param('user_id', Service.load);
  app.use('/v1', router);

  let routerAuth = express.Router();
  routerAuth.post('/login', session.login);
  routerAuth.post('/logout', session.auth, session.logout);
  app.use('/v1', routerAuth);
};
