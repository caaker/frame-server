const mongoose = require('mongoose');

// note that path holds the database name, ie /myapp
const connection_string = process.env.MONGO || 'mongodb://127.0.0.1:27017/myapp';

const connection_params = {
  serverSelectionTimeoutMS: 10000
};

mongoose.connect(connection_string, connection_params).then(() => {
  console.log('\x1b[32m' + 'DEBUG: mongoose: connected: ' + connection_string + '\x1b[30m');
}).catch((err) => {
  console.error('DEBUG: mongoose: not connected: ' + connection_string);
});

module.exports = mongoose;