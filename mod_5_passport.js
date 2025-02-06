console.log('DEBUG: passport:');

const Passport = require('passport');
const GoogleAuth = require('passport-google-oauth').OAuth2Strategy;
const { getOrSaveUser, serialize, deserialize } = require('./mod_5_passport_helper');

// find the connection string and parse it
let connection;
if (process.env.PASSPORT) {
  connection = JSON.parse(process.env.PASSPORT).Google;
  console.log('DEBUG: passport: connection string found: ');
} else {
  console.log('\x1b[31m' + 'DEBUG: passport: connection string not found' + '\x1b[30m');
}

// with a connection string we can now configure passport and export it for further configuration
if(connection) {
  const GAObject = new GoogleAuth(connection, getOrSaveUser);
  Passport.use('google', GAObject);
  Passport.serializeUser(serialize);
  Passport.deserializeUser(deserialize);
}

module.exports = Passport;
