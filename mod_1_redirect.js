console.log('DEBUG: HTTPSredirect:');

// required after upgrade to https
function HTTPSredirect(app) {

  //  this is set in heroku
  if(process.env.NODE_ENV === 'production') {

    // we will check all requests
    app.use((req, res, next) => {

      // x-fowarded-protocol is typically added by the proxy server
      // ensure proxy server writes this to eliminate spoofing
      // if the protocol is not https
      if (req.header('x-forwarded-proto') !== 'https') {

        // redirect to https, ie enforce the https protocol
        res.redirect(`https://${ req.header('host') }${ req.url }`);

      } else {

        // do nothing
        next();
      }
    });
  }
}

module.exports = HTTPSredirect;
