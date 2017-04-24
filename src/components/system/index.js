import app from './app';
import http from 'http';
import glob from 'glob';
import log4js from 'log4js';
import config from '../../config';
import { Utils } from './app/utils';

export class System {

  constructor() {
    this.logger = log4js.getLogger('system');
    this.port = Utils.normalizePort(process.env.PORT || config.port);
  }

  loadModules(dirname) {
    let routes = glob.sync(dirname + '/modules/**/*.routes.js');
    routes.forEach((route) => {
      try {
        this.logger.debug(route);
        let moduleRoute = require(route);
        if (moduleRoute instanceof Function) {
          moduleRoute(app);
        } else {
          this.logger.error(route, 'is not a module');
        }
      } catch (e) {
        console.log(e.stack);
      }
    });
    return new Promise((response, reject) => {
      response(true);
    });
  }

  /**
   * Start running server on port from environment and store in Express.
   */
  start() {
    return new Promise((response, reject) => {
      require('./app/default')(app);
      this.server = http.createServer(app);
      this.server.listen(this.port);
      response(true);
    });
  }
}
