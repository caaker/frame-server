import { getClientID } from './ws-user-id.js';

const users = new Map();

export const clientConnected = function(socket) {
  const id = getClientID();
  socket._id = id;
  const user_object = {
    id: id,
    type: 'connected'
  };
  users.set(id, user_object);
};

export const clientClosed = function(socket) {
  users.delete(socket._id);
};

export const receivedFingerPrint = function(socket, obj) {
  const id = socket._id;
  const user_object = {
    id: id,
    fingerprint: obj.message,
    type: 'fingerprint'
  };
  users.set(id, user_object);
  sendObject(user_object, socket);
};

export const receivedEcho = function(socket, obj) {
  sendObject(obj.message, socket);
};

function sendObject(obj, socket) {
  socket.send(JSON.stringify(obj));
}