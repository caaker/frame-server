console.log('DEBUG: passport_helper:');
const database = require('./mongo/mongoose');
const mongoose = require('mongoose');
const { getProps, serialize } = require('./mod_5_passport_helper_helper');

// getOrSaveUser is called once per authenticatin attempt
function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = getProps(profile);
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

function saveUser(done, props) {
  return database.saveUser(props).then(() => {
    done(null, props);
  });
}

function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    done(null, res[0]);
  });
}

module.exports = {
  getOrSaveUser,
  deserialize,
  serialize
};