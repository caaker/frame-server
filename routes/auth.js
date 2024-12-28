const router = require('express').Router();
const passport = require('passport');


// path is /auth/google
const scope = {
  scope: ['email', 'profile']
};
router.get('/google', passport.authenticate('google', scope));


// path is /auth/google/callback
const options = {
  successRedirect: '/',
  failureRedirect: '/login',
};
router.get('/google/callback', passport.authenticate('google', options));


// path is /auth/logout and sends user to /
router.route('/logout').get((req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;