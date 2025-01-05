const router = require('express').Router();
const passport = require('passport');


// receives at /auth/google and calls passport.authenticate
const scope = {
  scope: ['email', 'profile']
};
router.get('/google', passport.authenticate('google', scope));


// receives at /auth/google/callback and sends user to / on success
const options = {
  successRedirect: '/',
  failureRedirect: '/login',
};
router.get('/google/callback', passport.authenticate('google', options));


// receives at /auth/logout and sends user to /
router.route('/logout').get((req, res) => {

  // passport update requires a callback to logout or error is thrown
  req.logout((err) => {

  });
  res.redirect('/');
});


module.exports = router;