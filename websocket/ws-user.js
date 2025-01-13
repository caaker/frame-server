const getClientID = require('./ws-user-id');
const users = require('./ws-user-map');
const exported = {};

// when a client connects, give them and id, and set their object type to 'connected'
exported.clientConnected = function(socket) {
  const id = getClientID();
  socket._id = id;
  const user_object = {
    id: id,
    type: 'connected'
  };
  users.set(id, user_object);
  // console.log('DEBUG: websocket: client connected: id: ' + id);
  // console.log('DEBUG: websocket: total clients: ' + users.size);
};

// when a client disconnects delete them from the user map
exported.clientClosed = function(socket) {
  users.delete(socket._id);
  // console.log('DEBUG: websocket: client disconnected: id: ' + socket._id);
};

// we have received a message event of type fingerprint, which is on obj.message
// we can save the user fingerprint to a database at this point for later lookup
exported.receivedFingerPrint = function(socket, obj) {
  const id = socket._id;
  const user_object = {
    id: id,
    fingerprint: obj.message,
    type: 'fingerprint'
  };
  users.set(id, user_object);
  sendObject(user_object, socket);
};

// we have recevied a message event of type echo, send it directly back to the client
exported.receivedEcho = function(socket, obj) {
  sendObject(obj.message, socket);
  // console.log('DEBUG: websocket: received echo: ' + socket._id);
};

// stringify the user object and send it to the client
function sendObject(obj, socket) {
  socket.send(JSON.stringify(obj));
}

module.exports = exported;
