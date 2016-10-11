import app from './app';
import http from 'http';
import utils from './app/utils';

export default class System {

  constructor() {
    this.name = 'node-seed-es6';
    this.port = utils.normalizePort(process.env.PORT || '3000');
    this.server = http.createServer(app);
  }

  getName() {
    return this.name;
  }

  /**
   * Start running server on port from environment and store in Express.
   */
  start() {
    return new Promise((response, reject) => {
      if (this.server) {
        this.server.listen(this.port);
        response(true);
      } else {
        console.error('server instance is not created');
      }
    });
  }
}
