

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
