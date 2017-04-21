import express from 'express';
import { Service } from './service';
import { SessionService } from '../../components/session/services/session';

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
  routerAuth.post('/login', SessionService.login);
  routerAuth.post('/logout', SessionService.auth, SessionService.logout);
  app.use('/v1', routerAuth);
};
