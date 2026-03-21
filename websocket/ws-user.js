import { getClientID } from './ws-user-id.js';
const users = new Map();

const clientConnected = (socket) => {
  const id = getClientID();
  socket._id = id;
  const user_object = {
    id: id,
    type: 'connected'
  };
  users.set(id, user_object);
};
const clientClosed = (socket) => {
  users.delete(socket._id);
};
const receivedFingerPrint = (socket, obj) => {
  const id = socket._id;
  const user_object = {
    id: id,
    fingerprint: obj.message,
    type: 'fingerprint'
  };
  users.set(id, user_object);
  sendObject(user_object, socket);
};
const receivedEcho = (socket, obj) => {
  sendObject(obj.message, socket);
};
const sendObject = (obj, socket) => {
  socket.send(JSON.stringify(obj));
};

export {
  clientConnected,
  clientClosed,
  receivedFingerPrint,
  receivedEcho
};