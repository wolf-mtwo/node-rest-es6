import crypto from 'crypto';

export class PasswordUtils {

  static change_password(user) {
    if (!user.password) {
      throw new Error('password is undefined');
    }
    user.password = crypto.createHash('md5')
    .update(user.password).digest('hex');
    return user;
  }
}
