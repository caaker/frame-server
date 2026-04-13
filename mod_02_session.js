import session from 'express-session';
import MongoStore from 'connect-mongo';

const session_options = {

  // 'name' is the name of the session cookie
  name: 'livelong-1',

  // 'secret' is used to sign the cookie, and should be moved to an environment variable or similar
  secret: 'iamnotasecret016',

  // only this property was added to update to use mongodb
  store: MongoStore.create({
    mongoUrl: process.env.MONGO, // Replace with your connection string
    ttl: 14 * 24 * 60 * 60, // Sessions expire in 14 days
    autoRemove: 'native', // Let MongoDB handle expired session deletion
    touchAfter: 24 * 3600 // Only update the session in DB once every 24 hours (unless data changes)
  }),

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
