import System from './components/system';
import log4js from 'log4js';
let logger = log4js.getLogger('app');

let system = new System();
system.loadModules(__dirname)
.then(() => {
  logger.info('modules where loaded');
  return system.start();
})
.then(() => {
  logger.info('server started at port: ' + system.port);
});
