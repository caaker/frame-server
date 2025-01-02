console.log('----------------------------------------------------------------------------------------------------');
console.log('                                         STARTING                                                   ');
console.log('----------------------------------------------------------------------------------------------------');
console.log('DEBUG: index.js: seconds: ' + (new Date).getSeconds());

const express = require('express');
const app = express();
 
// GENERAL

// use node http to create a server
const server = require('./mod_0_server')(app);

// required by heroku which is behind an ngix server; required after https upgrade
// app.enable('trust proxy');

// redirect http requests to https
require('./mod_1_redirect')(app);

// log ip addresses of clients
require('./mod_2_ip')(app);

// start websocket server
require('./mod_3_ws')(server);

// EXPRESS

// required to populate req.body when it comes in as JSON
app.use(express.json());

// serves index.html and other static data
app.use('/', express.static('./dist'));

// SESSION

const session_instance = require('./mod_4_session');
app.use(session_instance);

// PASSPORT

// consider pure implementation of google authorization
const passport = require('./mod_5_passport');
app.use(passport.initialize());
app.use(passport.session());

// ROUTES

const routes = require('./mod_6_routes');
app.use('/articles', routes.articles);
app.use('/users', routes.users);
app.use('/openweather', routes.openweather);
app.use('/auth', routes.auth);

// ERRORS
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).send('Something went wrong');
});
