import config from '../config';
import amqplib from 'amqplib';

// var amqp = require('amqplib/callback_api');
/*
amqp.connect(config.host, (err, conn) => {
  conn.createChannel((err, ch) => {
    var q = 'task_queue';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
*/

export class Task {

  constructor() {
    // this.open = null;
    this.ch = null;
    this.conn = null;
  }

  // start() {
  //   this.open = amqplib.connect(config.host);
  //   this.open
  //   .then((conn) => {
  //     return conn.createChannel();
  //   })
  //   .then((ch) => {
  //     var q = 'task_queue';
  //     return ch.assertQueue(q, {durable: true})
  //     .then((ok) => {
  //       return ch.sendToQueue(q, new Buffer('something to do'), {persistent: true});
  //     });
  //   })
  //   .catch(console.warn);
  // }
  start() {
    return amqplib.connect(config.host)
    .then((conn) => {
      this.conn = conn;
      return conn.createChannel();
    })
    .then((ch) => {
      this.ch = ch;
    })
    .catch(console.warn);
  }

  emit(topic, message) {
    return this.ch.assertQueue(topic, {durable: true})
    .then((ok) => {
      this.ch.sendToQueue(
        topic, new Buffer(JSON.stringify(message)), {persistent: true}
      );
    });
  }

  stop() {

  }
}

var task = new Task();
task.start()
.then(() => {
  setInterval(() => {
    console.log('task_queue');
    task.emit('task_queue', { message: 'something to do'});
  }, 2000);
})
.catch(console.warn);
