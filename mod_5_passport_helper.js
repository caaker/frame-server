console.log('DEBUG: passport_helper:');
const database = require('./mongo/mongoose');
const mongoose = require('mongoose');

// getOrSaveUser is called once per authenticatin attempt
function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = filterGoogleProps(profile);
  console.log(profile);
  console.log(props);
  database.getUser(props.id_google).then( (response) => {
    if(response[0]) {
      userFound(done, props);
    } else {
      saveUser(done, props);
    }
  }).catch((error) => {
    console.logD("DEBUG: passport_helper: getOrSaveUser:", 'red');
    done(error, null, "DEBUG: passport_helper: getOrSaveUser:" );
  });
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

// serialized and deserialize functions
function serialize(profile, done) {
  done(null, profile.id_google);
}
function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    done(null, res[0]);
  });
}

// functions necessary to use Passport
module.exports = {
  getOrSaveUser,
  deserialize,
  serialize
};
