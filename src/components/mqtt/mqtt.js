import mqtt from 'mqtt';

export class Mqtt {

  constructor() {
    this.client = null;
  }

  start() {
    var client  = mqtt.connect('mqtt://localhost');
    this.client = mqtt.connect(`mqtt://${server.ip}:1884`, {
      clientId: '1000',
      clean: false,
      keepalive: 60,
      reconnectPeriod: 1000
    });

    client.on('connect', () => {
      client.subscribe('presence');
      client.publish('presence', 'Hello mqtt');
    });

    client.on('message', (topic, message) => {
      // message is Buffer
      console.log(message.toString());
      client.end();
    });
  }

  stop() {

  }
}
