import _ from 'lodash';
import log4js from 'log4js';
import mongoose from 'mongoose';

export class Master {

  constructor(model_name) {
    if (!model_name) {
      throw new Error('model_name is empty');
    }
    this.model_name = model_name;
    this.logger = log4js.getLogger('model');
    this.Model = mongoose.model(model_name);
  }

  get_by_id(id) {
    if (!id) {
      throw new Error('id is empty');
    }
    return new Promise((resolve, reject) => {
      this.Model.findById(id, (err, item) => {
        if (err) {
          reject(err);
        } if (!item) {
          reject(new Error('Failed to load model ' + id));
        } else {
          resolve(item);
        }
      });
    });
  }

  create(data) {
    var item = new this.Model(data);
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
      this.Model.findOne(query)
      .exec((err, item) => {
        if (err) {
          reject(err);
        } else {
          resolve(item);
        }
      });
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this.Model.find(query).sort('-created')
      .exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  query_short(query, short_by) {
    return new Promise((resolve, reject) => {
      this.Model.find(query)
      .sort(short_by)
      .exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  pagination(query, page, limit) {
    if (page <= 0) {
      throw new Error('cannot be the page under 0');
    }
    if (limit <= 0) {
      throw new Error('cannot be the limit under 0');
    }
    return new Promise((resolve, reject) => {
      this.Model.find(query)
      .limit(limit)
      .skip(limit * --page)
      .sort('-created')
      .exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }

  pagination_short(query, page, limit, short_by) {
    if (page <= 0) {
      throw new Error('cannot be the page under 0');
    }
    if (limit <= 0) {
      throw new Error('cannot be the limit under 0');
    }
    return new Promise((resolve, reject) => {
      this.Model.find(query)
      .limit(limit)
      .skip(limit * --page)
      .sort(short_by)
      .exec((err, items) => {
        if (err) {
          reject(err);
        } else {
          resolve(items);
        }
      });
    });
  }
}
