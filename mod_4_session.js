console.log('DEBUG: session:');
const Session = require('express-session');

// 'name' is the name of the session cookie
// 'secret' is used to sign the cookie, and should be moved to an environment variable or similar
// 'saveUninitialized' default is true but we will set it explicitly.
// 'resave' default is true but we will set it explicitly.
const session_options = {
  name: 'livelong-1',
  secret: 'iamnotasecret016',
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: true,
    sameSite: 'None'
  }
};

module.exports = Session(session_options);
