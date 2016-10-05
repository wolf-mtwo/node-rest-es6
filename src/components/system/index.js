import app from './app';
import http from 'http';
// console.log(App);

export default class System {

  constructor() {
    this.name = 'node-seed-es6';
  }

  getName() {
    return this.name;
  }

  /**
   * Get port from environment and store in Express.
   */
  init() {
    // TODO Update port static value
    // app.set('port', port);
    return http.createServer(app);
  }

  getPort() {
    return this.normalizePort(process.env.PORT || '3000');
  }

  normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
}
