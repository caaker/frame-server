import mongoose from 'mongoose';

const connection_string = process.env.MONGO || 'mongodb://127.0.0.1:27017/myapp';

// 10 seconds timeout
const connection_params = {
  serverSelectionTimeoutMS: 10000
};

mongoose.connect(connection_string, connection_params).then(() => {
  console.logD('DEBUG: mongoose: connected: ', 'green');
}).catch((err) => {
  console.logD('DEBUG: mongoose: error: not connected: ', 'red');
});