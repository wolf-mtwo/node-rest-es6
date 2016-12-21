export default class Service {

  constructor(master) {
    this.master = master;
  }

  create(req, res, next) {
    this.master.create(req.body)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };
}
