var mongoose = require('mongoose');
var _ = require('lodash');

module.exports = function(name) {
  if (!name) {
    throw new Error('name is empty');
  }

  var Item = mongoose.model(name);
  var common = require('./common')(name);
  var model_name = name.toLowerCase();

  var model = function(req, res, next, id) {
    if (!id) {
      throw new Error('id is empty');
    }
    req.body[model_name] = id;
    common.get_by_id(id)
    .then(function(response) {
      req[model_name] = response;
      next();
    })
    .catch(function(err) {
      next(err);
    });
  };

  var create = function(req, res, next) {
    common.create(req.body)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  var update = function(req, res, next) {
    var item = req[model_name];
    item = _.extend(item, req.body);
    common.update(item)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  var remove = function(req, res, next) {
    var item = req[model_name];
    common.remove(item)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  var show = function(req, res) {
    res.json(req[model_name]);
  };

  var all = function(req, res, next) {
    var query = req.query || {};
    common.all(query)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  var query = function(req, res, next) {
    var query = req.query || {};
    common.all(query)
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  var pagination = function(req, res, next) {
    var query = req.query || {};
    common.query(query, req.page, req.limit)
    .then(function(response) {
      res.json(response);
    }).catch(function(err) {
      next(err);
    });
  };

  var page = function(req, res, next, id) {
      req.page = id;
      next();
  };
  var limit = function(req, res, next, id) {
      req.limit = id;
      next();
  };

  var pagination_short = function(req, res, next) {
    var query = req.query || {};
    common.query_short(query, req.page, req.limit, '-created')
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
      next(err);
    });
  };

  return {
    all: all,
    show: show,
    page: page,
    limit: limit,
    query: query,
    model: model,
    create: create,
    update: update,
    remove: remove,
    pagination: pagination,
    pagination_short: pagination_short
  };
};
