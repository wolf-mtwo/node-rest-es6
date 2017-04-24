import log4js from 'log4js';
import { System } from './components/system';
import { MongoDB } from './components/mongo';

let logger = log4js.getLogger('app');
let system = new System();

MongoDB.start()
.then(() => {
  logger.info('Database connect successfully');
  return MongoDB.loadModels(__dirname);
})
.then(() => {
  logger.info('mongo models where loaded');
  return system.loadModules(__dirname);
})
.then(() => {
  logger.info('modules where loaded');
  return system.start();
})
.then(() => {
  logger.info('server started at port: ' + system.port);
});
