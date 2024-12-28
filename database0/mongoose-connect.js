const env_found = process.env.MONGOOSE_URL

function getMongoose() {
  if(!env_found  || process.env.NODE_ENV !== 'production' ) {
    return 'mongodb://127.0.0.1:27017/myapp' ;
  } else if(env_found) {
    return env_found;
  } else {
    console.error('DEBUG: configure mongoose please.');
  }
};

const connection_string = getMongoose();
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
};

const mongoose = require('mongoose');
mongoose.connect(connection_string, config).then(() => {
  console.log('DEBUG: mongoose: connected');
}).catch((err) => {
  console.error('DEBUG: mongoose: not connected: ' + connection_string);
  // console.error(err);
});

module.exports = mongoose;
