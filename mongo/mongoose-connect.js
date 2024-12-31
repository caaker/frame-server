const mongoose = require('mongoose');

const connection_string = process.env.MONGOOSE_URL || 'mongodb://127.0.0.1:27017/myapp';

const connection_params = {
  serverSelectionTimeoutMS: 10000
};

mongoose.connect(connection_string, connection_params).then(() => {
  console.log('DEBUG: mongoose: connected: ' + connection_string);
}).catch((err) => {
  console.error('DEBUG: mongoose: not connected: ' + connection_string);
});

module.exports = mongoose;