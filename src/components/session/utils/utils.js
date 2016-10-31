var crypto = require('crypto');

exports.update_password = function(user_data) {
  if (!user_data.password) {
    throw new Error('user_data.password is empty');
  }

  user_data.password = crypto.createHash('md5')
    .update(user_data.password).digest("hex");
  return user_data;
};
