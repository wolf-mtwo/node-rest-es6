import _ from 'lodash';
import { PasswordUtils } from '../utils/password';
import { User } from '../models/user';
import { MiddlewareService } from '../../../components/adapter/middleware.service';

let model = new User();
let middleware = new MiddlewareService(model);

export class Service {

  static query(req, res, next) {
    middleware.query(req, res, next);
  }

  static pagination(req, res, next) {
    middleware.pagination(req, res, next);
  }

  static create(req, res, next) {
    let data = PasswordUtils.change_password(req.body);
    model.find_one({
      email: data.email
    })
    .then((item) => {
      if (item) {
        throw new Error('users already exist');
      }
      return model.create(data);
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  static show(req, res, next) {
    middleware.show(req, res, next);
  }

  static update(req, res, next) {
    var data = PasswordUtils.change_password(req.body);
    model.get_by_id(data.user)
    .then((item) => {
      if (!item) {
        throw new Error('invalid user _id');
      }
      if (item.email === data.email) {
          return item;
      }
      return model.find_one({
        email: data.email
      })
      .then((response) => {
        if (!response) {
          return item;
        }
        if (response._id === data._id) {
            return response;
        } else {
          throw new Error('other users has taken this email');
        }
      });
    })
    .then((item) => {
      data = _.extend(item, data);
      return model.update(data);
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      next(err);
    });
  }

  static remove(req, res, next) {
    middleware.remove(req, res, next);
  }

  static load(req, res, next, id) {
    middleware.load(req, res, next, id);
  }

  static page(req, res, next, id) {
    middleware.page(req, res, next, id);
  }

  static limit(req, res, next, id) {
    middleware.limit(req, res, next, id);
  }
}
