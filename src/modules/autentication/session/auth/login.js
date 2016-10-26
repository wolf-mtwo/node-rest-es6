var jwt = require('jsonwebtoken');
var utils = require('../../utils/utils');
var config = require('../../../../config');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(req, res) {
  try {
    if (!req.body.email) {
        throw new Error("email is empty");
    }
    if (!req.body.password) {
      throw new Error("password is empty");
    }
  } catch (e) {
    res.status(500).json({message: e.message});
    return;
  }

  var user_data = utils.update_password(req.body);
  User.findOne({
    email: user_data.email,
    password: user_data.password
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(500).json({
        message: 'Authentication failed. User not found.'});
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(500).json({
          message: 'Authentication failed. Wrong password.'});
      } else {
        var token = jwt.sign({
            email: user.email,
            password: user.password
          }, config.secret, {
//          expiresIn: 86400 * 7,// 1440 expires in 24 hours
          algorithm: 'HS512'
        });
        var token_response = {
          session_id: token
        };
        var us = user._doc;
        us.token = token_response;
        res.json(user);
      }
    }
  });
};
