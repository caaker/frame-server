const router = require('express').Router();
const passport = require('passport');


// auth/google begins the authentication request from the client by calling passport.authenticate
const scope = {
  scope: ['email', 'profile']
};
router.get('/google', passport.authenticate('google', scope));

// google has fielded the request and responded - we will always respond to the requester
function getHost(req, res, next) {
  let host = req.protocol + '://' + req.get('host');
  req.auth_options = { successRedirect: host + '/', failureRedirect: host + '/' };
  console.log('DEBUG: route: google auth: getHost: successRedirect: ' + req.auth_options.successRedirect);
  next();
}

// to avoid using global we put the options on the request object and retreive here
function authenticateWrap(req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next);
}

router.get('/google/callback', getHost, authenticateWrap );

function getHostAgain(req) {
  return req.protocol + '://' + req.get('host') + '/';
}

// auth/logout begins the logout process
router.route('/logout').get((req, res) => {
  req.logout(() => {});
  res.redirect(getHostAgain(req));
});



module.exports = router;


// const options = {
//   successRedirect: '/',
//   failureRedirect: '/login',
// };


// // auth/logout begins the logout process
// router.route('/logout').get((req, res) => {
//   // passport update requires a callback to logout or error is thrown
//   req.logout((err) => { });
//   res.redirect('/');
// });
