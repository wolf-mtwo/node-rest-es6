import mosca from 'mosca';
import log4js from 'log4js';
import config from './config';

var ascoltatore = {
  type: 'mongo',
  url: config.mongo.host,
  pubsubCollection: config.mongo.collection,
  mongo: {}
};

var settings = {
  port: config.broker.port,
  backend: ascoltatore
};

export class Broker {

  constructor() {
    this.client = null;
    this.logger = log4js.getLogger('Broker');
  }

  start() {
    return new Promise((resolve) => {

      var server = new mosca.Server(settings);

      server.on('clientConnected', (client) => {
        console.log('client connected', client.id);
      });

      // fired when a message is received
      server.on('published', (packet, client) => {
        console.log('Published', packet.payload);
      });

      server.on('ready', () => {
        this.logger.info('Mosca server is up and running');
        return resolve();
      });
    });
  }

  stop() {
  }
}
