import session from 'express-session';
console.log('DEBUG: session:');

const session_options = {

  // 'name' is the name of the session cookie
  name: 'livelong-1',

  // 'secret' is used to sign the cookie, and should be moved to an environment variable or similar
  secret: 'iamnotasecret016',

  // 'saveUninitialized' default is true but we will set it explicitly.
  // this means all users wether they login or not have a session cookie
  saveUninitialized: true,

  // default is true, but set to false as mongoDB supports touch operatoins
  // we do not want to resave to the session store on each user request if no data changed
  // note that mongodb-connect will automatically reset maxAge on each request
  resave: false,

  // cookie monster
  cookie: {

    // required for cors
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',

    // default but setting explicity so cookie persists the length of the browser
    maxAge: null
  }
};

export const session_instance = session(session_options);
