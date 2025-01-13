/*
 *
**/


console.log('DEBUG: passport:');


const Passport = require('passport');
const GoogleAuth = require('passport-google-oauth').OAuth2Strategy;
const database = require('./mongo/mongoose');


/*
 *    find the connection string and parse it
**/

let connection = null;
if (process.env.PASSPORT) {
  connection = JSON.parse(process.env.PASSPORT).Google;
  if (process.env.NODE_ENV !== 'local') {
    let baseURL = 'https://frame-server-x8qw.onrender.com';
    connection.callbackURL = baseURL + '/auth/google/callback';
  }
}

console.log('DEBUG: passport: callbackURL: ' + connection.callbackURL);

/*
 *    with a connection string we can now configure passport
**/


if(connection) {
  const test = new GoogleAuth(connection, getOrSaveUser);
  Passport.use('google', test);
  Passport.serializeUser(serialize);
  Passport.deserializeUser(deserialize);
}


/*
 *    getOrSaveUser is called once per authenticatin attempt
**/


function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = filterGoogleProps(profile);
  database.getUser(props.id_google).then( (response) => {
    if(response[0]) {
      userFound(done, props);
    } else {
      saveUser(done, props);
    }
  }).catch(error => done(error));
}

// the user was found in the database
function userFound(done, props) {
  console.log('DEBUG: passport: user found in the database: ');
  done(null, props);
}

// save the user to database
function saveUser(done, props) {
  return database.saveUser(props).then(() => {
    console.log('DEBUG: passport: user saved to the database: ');
    done(null, props);
  });
}

// these are the properties we care about
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
 *    serialized and deserialize functions
**/


// used to save a unique identifier for the user, not the user data, in this case profile.id_google
function serialize(profile, done) {
  done(null, profile.id_google);
}

// retreives the full user object from the database
function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    done(null, res[0]);
  });
}


/*
 *    export for use as follows - app.use(passport.initialize()) and app.use(passport.session());
**/


module.exports = Passport;