const { logEvents } = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

// Init object
const myEmitter = new MyEmitter();

// Add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));

// Emit the 'log' event
setTimeout(() => {
  myEmitter.emit('log', 'Log event emitted!');
}, 2000);
