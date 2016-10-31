var auth = require('./auth/auth');
var login = require('./auth/login');
var logout = require('./auth/logout');

exports.login = login;
exports.logout = logout;
exports.auth = auth;
