import { Session } from '../session';

let session = new Session();

export class SessionService {

  static auth(req, res, next) {
    session.auth(req, res, next);
  }

  static login(req, res, next) {
    session.login(req, res, next);
  }

  static logout(req, res, next) {
    session.logout(req, res, next);
  }
}
