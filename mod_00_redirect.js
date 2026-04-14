export const configureRedirect = (app) => {

  //  NODE_ENV is set to production by render automatically
  if(process.env.NODE_ENV === 'production') {

    // we will check all requests
    app.use((req, res, next) => {

      // x-fowarded-protocol is typically added by the proxy server
      // ensure proxy server writes this to eliminate spoofing
      // ensure trust proxy is set
      if (req.header('x-forwarded-proto') !== 'https') {

        // redirect to https, i.e. enforce the https protocol
        // 301 permanent redirect is best practice for https enforcement
        res.redirect(301, `https://${ req.header('host') }${ req.url }`);

      } else {
        next();
      }
    });
  }
}