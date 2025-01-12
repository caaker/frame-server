const router = require('express').Router();
const passport = require('passport');

//
// authentication begins 
//

// auth/google begins the authentication request from the client by calling passport.authenticate
const scope = {
  scope: ['email', 'profile']
};
router.get('/google', passport.authenticate('google', scope));

//
// google has fielded the request and responded
//

// after authentication the user is directed to /auth/google/callback with options for success and failure
const options = {
  successRedirect: '/',
  failureRedirect: '/login',
};
router.get('/google/callback', passport.authenticate('google', options));

//
// logout logic
//

// receives at /auth/logout and sends user to /
router.route('/logout').get((req, res) => {

  // passport update requires a callback to logout or error is thrown
  req.logout((err) => {

  });
  res.redirect('/');
});


module.exports = router;