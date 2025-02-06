const router = require('express').Router();
const passport = require('passport');

/*
1. First request comes from the browser
****************************************************************************************************/
router.get('/google', (req, res, next) => {
  // referer is set by the browser and contains the browser url
  const referer = req.get('referer');
  console.log('DEBUG: routes: /auth/google: ');
  const config = {
    scope: ['email', 'profile'],
    state: referer
  }
  passport.authenticate('google', config )(req, res, next);
});

/*
2.  Second request comes from google server
/****************************************************************************************************/
router.get('/google/callback', getHost, authenticateWrap );
function getHost(req, res, next) {
  const referer = req.query.state;
  console.log('DEBUG: routes: /auth/google/callback: ');
  req.auth_options = { successRedirect: referer, failureRedirect: referer };
  next();
}
function authenticateWrap(req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next);
}

/*
a.  logout
/****************************************************************************************************/
router.get('/logout', (req, res) => {
  const referer = req.get('referer');
  console.log('DEBUG: routes: /auth/logout: ' + referer);
  req.logout(() => {});
  res.redirect(referer);
});

module.exports = router;
