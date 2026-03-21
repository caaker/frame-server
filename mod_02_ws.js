console.logD('DEBUG: websocket:', 'green');

import { WebSocketServer } from 'ws';
import { clientConnected, clientClosed } from  './websocket/ws-user.js';

let ws_server;

export default function websocket(server) {
  ws_server = new WebSocketServer({ server });
  ws_server.on('connection', clientConnection);
}

function clientConnection(socket) {
  User.clientConnected(socket);
  socket.on('message', (json) => routeMessage(json, socket));
  socket.on('close', () => clientClosed(socket));
}

function clientClosed(socket) {
  User.clientClosed(socket);
}

function routeMessage(json, socket) {
  try {
    const obj = JSON.parse(json);
    if (obj.type === 'fingerprint') {
      User.receivedFingerPrint(socket, obj);
      return;
    }  
    if (obj.type === 'echo') {
      User.receivedEcho(socket, obj);
      return;
    }
  } catch (err) {
    console.error('DEBUG: Failed to parse WebSocket message:', err);
  }
}