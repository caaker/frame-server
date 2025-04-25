console.logD('DEBUG: passport:');

const mongoose = require('mongoose');
const Passport = require('passport');
const GoogleAuth = require('passport-google-oauth').OAuth2Strategy;

if(process.env.NODE_ENV === 'production') {
  var { getOrSaveUser, serialize, deserialize } = require('./mod_5_pass_db');
} else {
  var { getOrSaveUser, serialize, deserialize } = require('./mod_5_pass_json');    
}

let connection_string;
if (process.env.PASSPORT) {
  connection_string = JSON.parse(process.env.PASSPORT).Google;
  console.logD('DEBUG: passport: connection_string found: ');
} else {
  console.logD('DEBUG: passport: connection_string not found', 'red');
}

if(connection_string) {
  const GAObject = new GoogleAuth(connection_string, getOrSaveUser);
  Passport.use('google', GAObject);
  Passport.serializeUser(serialize);
  Passport.deserializeUser(deserialize);
}

module.exports = Passport;
