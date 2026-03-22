import passport from 'passport';
import { OAuth2Strategy as GoogleAuth } from 'passport-google-oauth';
import { getOrSaveUser, serialize, deserialize } from './passport/passport-db.js';

let connection_string;
if (process.env.PASSPORT) {
  connection_string = JSON.parse(process.env.PASSPORT).Google;
  console.logD('DEBUG: passport: connection_string found: ');
} else {
  console.logD('DEBUG: passport: connection_string not found', 'red');
}

if(connection_string) {
  const GAObject = new GoogleAuth(connection_string, getOrSaveUser);
  passport.use('google', GAObject);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}

export { passport };