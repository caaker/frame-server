console.log('DEBUG: HTTPSredirect:');

// required after upgrade to https
function HTTPSredirect(app) {

  //  this is set in heroku
  if(process.env.NODE_ENV === 'production') {

    // we will check all requests for https in the url
    app.use((req, res, next) => {

      // if the protocol is not https
      if (req.header('x-forwarded-proto') !== 'https') {

        // redirect to https
        res.redirect(`https://${ req.header('host') }${ req.url }`);

      } else {

        // do nothing
        next();
      }
    });
  }
}

module.exports = HTTPSredirect;


