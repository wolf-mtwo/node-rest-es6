import mqtt from 'mqtt';
import log4js from 'log4js';
import config from './config';

export class Mqtt {

  constructor() {
    this.client = null;
    this.logger = log4js.getLogger('Mqtt');
    this.client = mqtt.connect(config.mqtt.host, {
      // clientId: '1000',
      clean: false
      // keepalive: 60,
      // reconnectPeriod: 1000
    });
  }

  start() {
    this.client.on('reconnect', (e) => {
      this.logger.debug('reconnecting...');
    });
    return new Promise((resolve) => {
      this.client.on('connect', () => {
        resolve();
      });
    });
  }

  subscribe(topic, options) {
    this.client.subscribe(topic, options);
  }

  emit(topic, message, options) {
    this.client.publish(topic, JSON.stringify(message), options);
  }

  on() {
    this.client.on('message', (topic, message) => {
      console.log(topic, message.toString());
    });
  }

  stop() {
    // this.client.subscribe('presence');
    this.client.end();
  }
}
