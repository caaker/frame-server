const router = require('express').Router();
const passport = require('passport');

// request email and profile when the user initiates {hostname}/auth/google
const scope = { scope: ['email', 'profile'] };
router.get('/google', passport.authenticate('google', scope));

//
// google has fielded the request and responded with its request
//

function getHost(req, res, next) {
  let host = req.protocol + '://' + req.get('host');
  const auth_options = {
    successRedirect: host + '/',
    failureRedirect: host + '/',
  };
  req.auth_options = auth_options;
  console.log('DEBUG: route: google auth: successRedirect: ' + auth_options.successRedirect);
  next();
}

router.get('/google/callback', getHost, (req, res, next) => {
  console.log(req.auth_options.successRedirect);
  passport.authenticate('google', req.auth_options)(req, res, next);
});

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


// router.get('/google/callback', passport.authenticate('google', options));
