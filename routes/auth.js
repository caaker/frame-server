const router = require('express').Router();
const passport = require('passport');

/****************************************************************************************************/

// note we need to send 'origin' to google, which will send it back to us below
router.get('/google', (req, res, next) => {
  const o1 = req.protocol + '://' + req.get('host');
  const o2 = req.headers.origin;
  const o3 = req.get('origin');
  const o4 = req.get('referer');
  console.log('DEBUG: route: google auth: state being sent to google: ');
  console.log(o1);
  console.log(o2);
  console.log(o3);
  console.log(req.headers);
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
  req.auth_options = { successRedirect: host + '/', failureRedirect: host };
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




// // auth/google begins the authentication request from the client by calling passport.authenticate
// const config = {
//   scope: ['email', 'profile'],
//   state: "hold"
// };
// router.get('/google', passport.authenticate('google', config));


// // google has fielded the request and responded
// function getHost(req, res, next) {
//   let host = req.protocol + '://' + req.get('host');
//   req.auth_options = { successRedirect: host + '/', failureRedirect: host + '/' };
//   console.log('DEBUG: route: google auth: getHost: successRedirect: ' + req.auth_options.successRedirect);
//   next();
// }