console.log('DEBUG: passport_helper:');
const database = require('./mongo/mongoose');
const mongoose = require('mongoose');

// getOrSaveUser is called once per authenticatin attempt
function getOrSaveUser(accessToken, refreshToken, profile, done) {
  // console.log('DEBUG: passport_helper: getOrSaveUser: mongoose.connection.readyState: ' + mongoose.connection.readyState);
  const props = filterGoogleProps(profile);
  database.getUser(props.id_google).then( (response) => {
    if(response[0]) {
      userFound(done, props);
    } else {
      saveUser(done, props);
    }
  }).catch(error => done(error));
}
function userFound(done, props) {
  console.log('DEBUG: passport: user found in the database: ');
  done(null, props);
}
function saveUser(done, props) {
  return database.saveUser(props).then(() => {
    console.log('DEBUG: passport: user saved to the database: ');
    done(null, props);
  });
}
function filterGoogleProps(profile) {
  const props = {};
  props.id_google = profile.id;
  props.email = profile.emails[0].value;
  props.name = profile.displayName;
  props.pic_url = profile.photos[0].value;
  props.type = profile._json.objectType;
  return props;
}

//    serialized and deserialize functions
function serialize(profile, done) {
  console.log('DEBUG: passport: user serialized: id: ' + profile.id_google);
  done(null, profile.id_google);
}
function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    console.log('DEBUG: passport: user deserialized: id: ' + id_google);
    done(null, res[0]);
  });
}

// functions necessary to use Passport
module.exports = {
  getOrSaveUser,
  deserialize,
  serialize
};
