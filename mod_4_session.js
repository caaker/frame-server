console.log('DEBUG: session:');

const Session = require('express-session');

// 'name' is for the session cookie, the 'secret' is used to sign the cookie
// 'saveUninitialized' default is true; we opt to save new users to the session store immediately for tracking
// 'resave' default is true for legacy reasons;  current recomendation is to set to false to cut down on load

const session_options = {
  name: 'livelong-0',
  secret: 'fooisfoo',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: true
  }
};

module.exports = Session(session_options);


  // cookie: {
  //   secure: true,
  //   sameSite: 'None'
  // }


  // cookie: {
  //   secure: true
  // }

// http://localhost:3000/auth/google/callback?state=http%3A%2F%2Flocalhost%3A3000%2F&code=4%2F0AanRRru3DRr3BBL0AxCf_b_phXzZJgx-hxmfowZX8QSdMrlLCyngcCCxhAnz_m9xe4k9qg&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserin