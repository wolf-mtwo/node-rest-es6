import _ from 'lodash';
import log4js from 'log4js';
import mongoose from 'mongoose';

export default class MongoDB {

  constructor(model_name) {
    if (!model_name) {
      throw new Error('model_name is empty');
    }
    this.logger = log4js.getLogger('model');
    this.Model = mongoose.model(model_name);
    this.per_page = 10;
  }

  get_by_id(id) {
    if (!id) {
      throw new Error('id is empty');
    }
    return new Promise((resolve, reject) => {
      this.Model.findById(id, function(err, item) {
        if (err) {
          reject(err);
        } if (!item) {
          reject(new Error('Failed to load model ' + id));
        } else {
          resolve(item);
        }
      });
    });
  };

  create(data) {
    var item = new this.Model(data);
    return new Promise((resolve, reject) => {
      item.save((err) => {
        if (err) return reject(err);
        resolve(item);
      });
    });
  }

  update(item) {
    return new Promise((resolve, reject) => {
      item.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  }

  remove(item) {
    return new Promise((resolve, reject) => {
      item.remove((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  }

  find_one(query) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(query).exec((err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  }

  all(query) {
    return new Promise((resolve, reject) => {
      this.Model.find(query).sort('-created').exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  query(query, page, limit) {
    if (page == 0) {
      throw new Error('cannot be 0 on pagination');
    }
    per_page = limit || per_page;
    return new Promise((resolve, reject) => {
      this.Model.find(query).
      limit(per_page).
      skip(per_page * --page).
      sort('-created').
      exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  query_short(query, page, limit, short_by) {
    if (page == 0) {
      throw new Error('cannot be 0 on pagination');
    }
    per_page = limit || per_page;
    return new Promise((resolve, reject) => {
      this.Model.find(query).
      limit(per_page).
      skip(per_page * --page).
      sort(short_by).
      exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }
}
