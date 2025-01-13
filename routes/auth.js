const router = require('express').Router();
const passport = require('passport');

/****************************************************************************************************/

// note we need to send 'origin' to google, which will send it back to us below
router.get('/google', (req, res, next) => {
  const o4 = req.get('referer');
  console.log('DEBUG: route: google auth: state being sent to google: ' + o4);
  // console.log(req.headers);
  const config = {
    scope: ['email', 'profile'],
    state: o4
  }
  passport.authenticate('google', config )(req, res, next);
});

/****************************************************************************************************/

// google traffic hits auth/google/callback which is seen as being sent from here
router.get('/google/callback', getHost, authenticateWrap );

// google has fielded the request and responded
function getHost(req, res, next) {
  // let host = req.protocol + '://' + req.get('host');
  let host = req.query.state;
  req.auth_options = { successRedirect: host, failureRedirect: host };
  console.log('DEBUG: route: google auth: state received from google:  ' + req.auth_options.successRedirect);
  next();
}

// to avoid using global we put the options on the request object and retreive here
function authenticateWrap(req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next);
}

function getHostAgain(req) {
  return req.get('referer');
  // return req.protocol + '://' + req.get('host') + '/';
}

/****************************************************************************************************/

// auth/logout begins the logout process
router.route('/logout').get((req, res) => {
  req.logout(() => {});
  res.redirect(getHostAgain(req));
});

module.exports = router;