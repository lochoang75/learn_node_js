// Import enets module
var events = require('events');

// Create an eventEmitteer object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
    console.log("connection succesful.");

    // Fire the data_receive event
    eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function () {
    console.log('data received successful.');
});

// Fire the connection event
eventEmitter.emit('connection');

console.log("Program Ended.");
