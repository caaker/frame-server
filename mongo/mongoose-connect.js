const mongoose = require('mongoose');

// note that path holds the database name, ie /myapp
const connection_string = process.env.MONGO || 'mongodb://127.0.0.1:27017/myapp';

// 10,000 msec or 10 sec
const connection_params = {
  serverSelectionTimeoutMS: 10000
};

mongoose.connect(connection_string, connection_params).then(() => {
  console.logD('DEBUG: mongoose: connected: ', 'green');
}).catch((err) => {
  console.logD('DEBUG: mongoose: error: not connected: ', 'red');
});
