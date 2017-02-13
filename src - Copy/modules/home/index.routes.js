import express from 'express';

/* GET home page. */
module.exports = (app) => {
  let router = express.Router();
  router.get('/', function(req, res, next) {
    res.json({
      vesion: '0.0.0'
    });
  });
  app.use('/', router);
};
