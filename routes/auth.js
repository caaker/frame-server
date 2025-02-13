// console.logD('DEBUG: routes: auth', 'cyan');

const router = require('express').Router();
const passport = require('passport');

/*

 - First request comes from the browser clicking to signin or signup
 - This server initiates a 302 redirect request to https://accounts.google.com/oauth2/v2/auth?client_id...

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
 
 - Gooogle auth server respond in turn with another 302 redirect back to this server as set in the google console
 - A final third redirect is initated based upon pass or fail; but this time to this server again

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

- Logout request come from browser clicking on logout

/****************************************************************************************************/
router.get('/logout', (req, res) => {
  const referer = req.get('referer');
  console.logD('DEBUG: routes: /auth/logout: ', 'blue');
  req.logout(() => {});
  res.redirect(referer);
});

module.exports = router;
