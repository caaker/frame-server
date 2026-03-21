
// redirect http requests to https
require('./mod_1_redirect')(app);

// log ip addresses of clients
require('./mod_2_ip')(app);

// EXPRESS

// required to populate req.body when it comes in as JSON
app.use(express.json());


app.use((req, res, next) => {
  if (req.method === 'GET' && req.path !== '/') {
    console.logD(`DEBUG: serving static files: ${req.path}`, 'yellow');
  }
  next();
});

// serves index.html and other static data
app.use('/', express.static('./dist'));

// SESSION

const session_instance = require('./mod_4_session');
app.use(session_instance);

// PASSPORT

// consider pure implementation of google authentication
const passport = require('./mod_5_pass');
app.use(passport.initialize());
app.use(passport.session());

// ROUTES

const routes = require('./mod_6_routes');
app.use('/articles',  routes.articles);
app.use('/users',     routes.users);
app.use('/auth',      routes.auth);
app.use('/test',      routes.test);


// ERRORS

app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).send('Something went wrong');
});
