import _ from 'lodash';
import crypto from 'crypto';
import utils from '../utils/utils';
var model = require('../../../components/mongo/model/model')('User');
var common = require('../../../components/mongo/model/common')('User');

exports.model = model.model;
exports.update = function(req, res, next) {
  var user_data = utils.update_password(req.body);
  common.find_one({
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
      return common.update(data);
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
};

exports.remove = model.remove;
exports.show = model.show;
exports.all = model.all;

exports.create = function(req, res, next) {
  var user_data = utils.update_password(req.body);
  common.find_one({
    email: user_data.email,
    password: user_data.password
  }).then(function(response) {
    if (response) {
      throw new Error('Users already exist.');
    } else {
      return common.create(user_data);
    }
  }).then(function(response) {
    res.json(response);
  }).catch(function(err) {
    next(err);
  });
};
