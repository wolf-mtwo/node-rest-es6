import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from './models/user';
import { PasswordUtils } from './utils/password';

export class Session {

  constructor() {
    this.user = new User();
  }

  auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
      let err = new Error('no x-access-token provided');
      err.status = 403;
      return next(err);
    }
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        let err = new Error('failed to authenticate token');
        err.status = 403;
        next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
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
    res.status(204).send();
  }
}
