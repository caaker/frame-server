console.log('DEBUG: session:');

const Session = require('express-session');

const session_options = {
  name: 'livelong.ai',
  secret: 'fooisfoo',
  saveUninitialized: true,
  resave: false
};

module.exports = Session(session_options);
