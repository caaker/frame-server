console.log('DEBUG: session:');

const Session = require('express-session');

// 'name' is for the session cookie, the 'secret' is used to sign the cookie
// 'saveUninitialized' default is true; we opt to save new users to the session store immediately for tracking
// 'resave' default is true for legacy reasons;  current recomendation is to set to false to cut down on load

const session_options = {
  name: 'livelong.ai',
  secret: 'fooisfoo',
  saveUninitialized: true,
  resave: false
};

module.exports = Session(session_options);
