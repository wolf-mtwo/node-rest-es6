import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from './models/user';
import { PasswordUtils } from './utils/password';
// var jwt = require('jsonwebtoken');
// var utils = require('../utils/utils');
// var config = require('../../../config');
// var mongoose = require('mongoose');
// var User = mongoose.model('User');

export class Session {

  constructor() {
      // console.log(User);
    this.user = new User();
  }

  auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: 'Failed to authenticate token'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
          message: 'No x-access-token provided'
      });
    }
  }

  login(req, res, next) {
    if (!req.body.email) {
        throw new Error('email is undefined');
    }
    if (!req.body.password) {
      throw new Error('password is undefined');
    }
    var data = PasswordUtils.change_password(req.body);
    return this.user.find_one({
      email: data.email,
      password: data.password
    })
    .then((user) => {
      if (!user) {
        throw new Error('authentication failed. user not found');
      }
      if (user.password != req.body.password) {
        throw new Error('authentication failed. user not found');
      }
      var token = jwt.sign({
        email: user.email,
        password: user.password
      }, config.secret, {
      //  expiresIn: 86400 * 7,// 1440 expires in 24 hours
        algorithm: 'HS512'
      });
      var token = {
        session_id: token
      };
      var us = user._doc;
      us.token = token;
      delete us.password;
      res.json(us);
    })
    .catch((err) => {
      err.status = 401;
      next(err);
    });
  }

  logout(req, res, next) {
    res.json({});
  }
}
