import log4js from 'log4js';
import { Broker, Mqtt } from './components/mqtt';

let mqtt = new Mqtt();
mqtt.start()
.then(() => {
  mqtt.subscribe('event');
  mqtt.subscribe('presence');
})
.then(() => {
  mqtt.on();
})
.then(() => {
  mqtt.emit('event', {message: 'generator'});
  mqtt.emit('presence', {message: 'Hello mqtt'});
})
.then(() => {
  mqtt.stop();
})
.catch((err) => {
  console.log(err);
});
