import { WebSocketServer } from 'ws';
import { clientConnected, clientClosed, receivedFingerPrint, receivedEcho } from './websocket/ws-user.js';

let ws_server;

function startWebsocketServer(server) {
  ws_server = new WebSocketServer({ server });
  ws_server.on('connection', clientConnection);
}

function clientConnection(socket) {
  clientConnected(socket);
  socket.on('message', (json) => routeMessage(json, socket));
  socket.on('close', () => clientClosed(socket));
}

function routeMessage(json, socket) {
  try {
    const obj = JSON.parse(json);
    if (obj.type === 'fingerprint') {
      receivedFingerPrint(socket, obj);
      return;
    }  
    if (obj.type === 'echo') {
      receivedEcho(socket, obj);
      return;
    }
  } catch (err) {
    console.error('DEBUG: Failed to parse WebSocket message:', err);
  }
}

export { startWebsocketServer };