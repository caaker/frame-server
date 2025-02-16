const router = require('express').Router();
const passport = require('passport');

/*
****************************************************************************************************/

router.get('/google', (req, res, next) => {

  // referer is set by the browser and contains the browser url
  const referer = req.get('referer');
  console.logD('DEBUG: routes: /auth/google: ', 'blue');
  const config = {
    scope: ['email', 'profile'],
    state: referer
  }
  passport.authenticate('google', config )(req, res, next);
});

/*
/****************************************************************************************************/

router.get('/google/callback', getHost, authenticateWrap );
function getHost(req, res, next) {
  const referer = req.query.state;
  console.logD('DEBUG: routes: /auth/google/callback: ', 'blue');
  req.auth_options = { successRedirect: referer, failureRedirect: referer };
  next();
}
function authenticateWrap(req, res, next) {
  passport.authenticate('google', req.auth_options)(req, res, next);
}

/*
/****************************************************************************************************/

router.get('/logout', (req, res) => {
  const referer = req.get('referer');
  console.logD('DEBUG: routes: /auth/logout: ', 'blue');
  req.logout(() => {});
  res.redirect(referer);
});

module.exports = router;
