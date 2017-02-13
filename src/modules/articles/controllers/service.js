import Controller from './controller';

let controller = new Controller();

export default class Service {

  static create(req, res, next) {
    controller.create(req.body)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };
}
