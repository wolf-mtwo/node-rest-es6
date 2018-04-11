import express from 'express';
import { Service } from './service';

module.exports = (app) => {
  let router = express.Router();
  router.get('/', Service.home);
  app.use('/', router);
};
