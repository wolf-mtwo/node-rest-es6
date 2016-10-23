var mongoose = require('mongoose');
var _ = require('lodash');
var per_page = 10;

module.exports = function(model_name) {
  if (!model_name) {
    throw new Error('model_name is empty');
  }
  var Item = mongoose.model(model_name);

  var get_by_id = function(id) {
    if (!id) {
      throw new Error('id is empty');
    }
    return new Promise(function(response, reject) {
      Item.findById(id, function(err, item) {
        if (err) {
          reject(err);
        } if (!item) {
          reject(new Error('Failed to load model ' + id));
        } else {
          response(item);
        }
      });
    });
  };

  var create = function(data) {
    var item = new Item(data);
    return new Promise(function(response, reject) {
      item.save(function(err) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          response(item);
        }
      });
    });
  };

  var update = function(item) {
    return new Promise(function(response, reject) {
      item.save(function(err) {
        if (err) {
          reject(err);
        } else {
          response(item);
        }
      });
    });
  };

  var remove = function(item) {
    return new Promise(function(response, reject) {
      item.remove(function(err) {
        if (err) {
          reject(err);
        } else {
          response(item);
        }
      });
    });
  };

  var find_one = function(query) {
    return new Promise(function(response, reject) {
      Item.findOne(query).exec(function(err, item) {
        if (err) {
          reject(err);
        } else {
          response(item);
        }
      });
    });
  };

  var all = function(query) {
    return new Promise(function(response, reject) {
      Item.find(query).sort('-created').exec(function(err, items) {
        if (err) {
          reject(err);
        } else {
          response(items);
        }
      });
    });
  };

  var query = function(query, page, limit) {
    if (page == 0) {
      throw new Error('cannot be 0 on pagination');
    }
    per_page = limit || per_page;
    return new Promise(function(response, reject) {
      Item.find(query).
      limit(per_page).
      skip(per_page * --page).
      sort('-created').
      exec(function(err, items) {
        if (err) {
          reject(err);
        } else {
          response(items);
        }
      });
    });
  };

  var query_short = function(query, page, limit, short_by) {
    if (page == 0) {
      throw new Error('cannot be 0 on pagination');
    }
    per_page = limit || per_page;
    return new Promise(function(response, reject) {
      Item.find(query).
      limit(per_page).
      skip(per_page * --page).
      sort(short_by).
      exec(function(err, items) {
        if (err) {
          reject(err);
        } else {
          response(items);
        }
      });
    });
  };

  return {
    all: all,
    query: query,
    create: create,
    update: update,
    remove: remove,
    find_one: find_one,
    get_by_id: get_by_id,
    query_short: query_short
  };
};
