import _ from 'lodash';

export default class MiddlewareService {

  constructor(model) {
    this.model = model;
    this.model_name = this.model.model_name.toLowerCase();
  }

  query(req, res, next) {
    let query = req.query || {};
    this.model.query(query)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      next(err);
    });
  }

  pagination(req, res, next) {
    let query = req.query || {};
    this.model.pagination(query, req.page, req.limit)
    .then((items) => {
      res.json(items);
    }).catch((err) => {
      next(err);
    });
  }

  pagination_short(req, res, next) {
    let query = req.query || {};
    this.model.pagination_short(query, req.page, req.limit, '-created')
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      next(err);
    });
  }

  create(req, res, next) {
    this.model.create(req.body)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  show(req, res) {
    res.json(req[this.model_name]);
  }

  update(req, res, next) {
    let item = req[this.model_name];
    item = _.extend(item, req.body);
    this.model.update(item)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  remove(req, res, next) {
    let data = req[this.model_name];
    this.model.remove(data)
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  load(req, res, next, id) {
    if (!id) {
      throw new Error('id is undefined');
    }
    req.body[this.model_name] = id;
    this.model.get_by_id(id)
    .then((item) => {
      req[this.model_name] = item;
      next();
    })
    .catch((err) => {
      next(err);
    });
  }

  page(req, res, next, id) {
    if (!id) {
      throw new Error('id is undefined');
    }
    req.page = parseInt(id);
    next();
  }

  limit(req, res, next, id) {
    if (!id) {
      throw new Error('id is undefined');
    }
    req.limit = parseInt(id);
    next();
  }
}
