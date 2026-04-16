import passport from 'passport';
import { Strategy as GoogleAuth } from 'passport-google-oauth20';
import { getOrSaveUser, serialize, deserialize } from './passport/passport-db.js';

let connection_string;
if (process.env.PASSPORT) {
  connection_string = JSON.parse(process.env.PASSPORT).Google;
}
console.logD(`DEBUG: Module: passport: connection_string = {connection_string}`);

if(connection_string) {
  const GAObject = new GoogleAuth(connection_string, getOrSaveUser);
  passport.use('google', GAObject);
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
}

export { passport };