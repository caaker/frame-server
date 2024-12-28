// this is a simple counter for user ids
const getUniqueUserID = require('./ws-user-id');
const users = require('./ws-user-hold');
const exported = {};

exported.clientOpened = function(socket) {
  const id = getUniqueUserID();
  socket._id = id;
  const user_object = {
    id: id,
    type: 'opened'
  };
  users.set(id, user_object);
  console.log('DEBUG: websocket: clientOpened: ' + id);
  // console.log(user_object);
};

exported.clientClosed = function(socket) {
  users.delete(socket._id);
  console.log('DEBUG: websocket: clientClosed: ' + socket._id);
  // console.log(socket._id);
};

exported.receivedFingerPrint = function(socket, obj) {
  const id = socket._id;
  const user_object = {
    id: id,
    fingerprint: obj.message,
    type: 'fingerprint'
  };
  users.set(id, user_object);
  sendObject(user_object, socket);
  // console.log('DEBUG: websocket: received fingerprint: ');
  // console.log(user_object);
};

exported.receivedEcho = function(socket, obj) {
  sendObject(obj.message, socket);
  console.log('DEBUG: websocket: received echo: ');
  // console.log(obj);
};

function sendObject(obj, socket) {
  socket.send(JSON.stringify(obj));
}

module.exports = exported;
