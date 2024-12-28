console.log('DEBUG: websocket:');

const WebSocket = require('ws');
const User = require('./ws/mod_ws_1_user');

function websocket(server) {
  ws_server = new WebSocket.Server({ server });
  ws_server.on('connection', clientOpened);
}

function clientOpened(socket) {
  User.clientOpened(socket);
  socket.on('message', (json) => routeMessage(json, socket));
  socket.on('close', () => clientClosed(socket));
}

function clientClosed(socket) {
  User.clientClosed(socket);
}

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