console.log('DEBUG: websocket:');

const WebSocket = require('ws');
const User = require('./ws/ws-user');

// starts a websocket server and listens for connection events
function websocket(server) {
  ws_server = new WebSocket.Server({ server });
  ws_server.on('connection', clientConnected);
}

// on a connection event listen for message events and close events
function clientConnected(socket) {
  User.clientConnected(socket);
  socket.on('message', (json) => routeMessage(json, socket));
  socket.on('close', () => clientClosed(socket));
}

function clientClosed(socket) {
  User.clientClosed(socket);
}

// route message events based on the type property in the message
function routeMessage(json, socket) {
  const obj = JSON.parse(json);

  if(obj.type === 'fingerprint') {
    User.receivedFingerPrint(socket, obj);
    return;
  }

  if(obj.type === 'echo') {
    User.receivedEcho(socket, obj);
    return;
  }

}

module.exports = websocket;