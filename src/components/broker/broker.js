// import jwt from 'jsonwebtoken';
// import config from '../../config';
// import { User } from './models/user';
// import { PasswordUtils } from './utils/password';

import mosca from 'mosca';

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: ascoltatore
};

export class Broker {

  constructor() {
    this.client = null;
  }

  start() {
    var server = new mosca.Server(settings);

    server.on('clientConnected', (client) => {
        console.log('client connected', client.id);
    });

    // fired when a message is received
    server.on('published', (packet, client) => {
      console.log('Published', packet.payload);
    });

    server.on('ready', setup);

    // fired when the mqtt server is ready
    function setup() {
      console.log('Mosca server is up and running');
    }
  }

  stop() {
  }
}
