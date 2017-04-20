import crypto from 'crypto';

export class PasswordUtils {

  static changePassword(user) {
    if (!user.password) {
      throw new Error('password is undefined');
    }
    user.password = crypto.createHash('md5')
    .update(user.password).digest('hex');
    return user;
  }
}
