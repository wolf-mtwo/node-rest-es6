import mongoose from 'mongoose';
import config from './config';
import glob from 'glob';
import log4js from 'log4js';

let logger = log4js.getLogger('database');

mongoose.Promise = global.Promise;

export default class MongoDB {

  static start() {
    return new Promise((response, reject) => {
      mongoose.connect(config.db, function(err) {
        if (err) reject(err);
        response();
      });
    });
  }

  static loadModels(dirname) {
    let models = glob.sync(dirname + '/**/*.schema.js');
    models.forEach((model) => {
      try {
        logger.debug(model);
        require(model);
      } catch (e) {
        console.log(e.stack);
      }
    });
    return new Promise((response, reject) => {
      response();
    });
  }
}
