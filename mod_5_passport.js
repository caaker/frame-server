console.log('DEBUG: passport:');

const Passport = require('passport');
const GoogleAuth = require('passport-google-oauth').OAuth2Strategy;
const database = require('./database0/mongoose.js');


/*
 *    Passport methods
**/

let connection;
if (process.env.PASSPORT) {
  connection = JSON.parse(process.env.PASSPORT).Google;
  console.log('DEBUG: passport: connection string found');
} else {
  console.error('DEBUG: passport: connection string not found');
  connection = null;
}

if(connection) {
  Passport.use('google', new GoogleAuth(connection, getOrSaveUser));
  Passport.serializeUser(serialize);
  Passport.deserializeUser(deserialize);
}


/*
 *    serialized and deserialize functions
**/


// used by passport.serializeUser()
function serialize(profile, done) {
  done(null, profile.id_google);
}

// used by passport.deserializeUser()
function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    done(null, res[0]);
  });
}


/*
 *    getOrSaveUser and helper functions
**/


// used by new GoogleAuth
function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = filterGoogleProps(profile);
  database.getUser(props.id_google).then( (response) => {
    if(response[0]) {
      getUser(done, props);
    } else {
      saveUser(done, props);
    }
  }).catch(error => done(error));
}

// get the user
function getUser(done, props) {
  console.log('DEBUG: passport: user exists in database: ');
  done(null, props);
}

// save the user
function saveUser(done, props) {
  console.log('DEBUG: passport: user does not exists in database: ');
  return database.saveUser(props).then(() => {
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


/*
 *    export for use as follows - app.use(passport.initialize()) and app.use(passport.session());
**/


module.exports = Passport;