import _ from 'lodash';
import utils from './utils/utils';
import User from './services/user';
import Middleware from '../../components/adapter/middleware.service';

let model = new User();
let middleware = new Middleware(model);

export default class Service {

  static query(req, res, next) {
    middleware.query(req, res, next);
  }

  static pagination(req, res, next) {
    middleware.pagination(req, res, next);
  }

  static create(req, res, next) {
    var user_data = utils.update_password(req.body);
    model.find_one({
      email: user_data.email,
      password: user_data.password
    }).then(function(response) {
      if (response) {
        throw new Error('Users already exist');
      } else {
        return model.create(user_data);
      }
    }).then(function(response) {
      res.json(response);
    }).catch(function(err) {
      next(err);
    });
  }

  static show(req, res, next) {
    middleware.show(req, res, next);
  }

  static update(req, res, next) {
    var user_data = utils.update_password(req.body);
    model.find_one({
      email: user_data.email,
      password: user_data.password
    })
    .then(function(response) {
      if (response) {
        if (user_data.new_password != user_data.confirm_password) {
          throw new Error('Invalid password');
        }
        user_data.password = user_data.new_password;
        var data = utils.update_password(user_data);
        data = _.extend(response, data);
        return model.update(data);
      } else {
        throw new Error('Invalid password');
      }
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err) {
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
