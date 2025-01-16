const router = require('express').Router();
const passport = require('passport');


/*
1.  First request comes from the browser
/****************************************************************************************************/
router.get('/google', (req, res, next) => {
  console.log('DEBUG: routes: /auth/google:' + origin );
  const origin = req.get('referer');
  const config = {
    scope: ['email', 'profile'],
    state: origin
  }
  passport.authenticate('google', config )(req, res, next);
});


/*
2.  Second request comes from google auth server
/****************************************************************************************************/
router.get('/google/callback', getHost, authenticateWrap );
function getHost(req, res, next) {
  console.log('DEBUG: routes: /auth/google/callback: ' + host);
  let host = req.query.state;
  req.auth_options = { successRedirect: host, failureRedirect: host };
  next();
}
function authenticateWrap(req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next);
}


/*
a.  logout
/****************************************************************************************************/
router.route('/logout').get((req, res) => {
  console.log('DEBUG: routes: /auth/logout: ' + getHostAgain(req) );
  req.logout(() => {});
  res.redirect(getHostAgain(req));
});
function getHostAgain(req) {
  return req.get('referer');
}


module.exports = router;