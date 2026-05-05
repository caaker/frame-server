export const configureRedirect = (app) => {
  console.logD(`DEBUG: Module: redirect: process.env.NODE_ENV = ${process.env.NODE_ENV}`);

  // required for code below to work correctly
  app.enable('trust proxy');

  //  NODE_ENV is set to production by render automatically
  //  If we are not on a production server we do not need to enforce https://
  if(process.env.NODE_ENV === 'production') {
      app.use((req, res, next) => {

      // x-fowarded-protocol is typically added by the proxy server
      // ensure trust proxy ( our render proxy in this case ) is set for this to work
      if (req.header('x-forwarded-proto') !== 'https') {

        // redirect to https, i.e. enforce the https protocol
        // 301 permanent redirect is best practice for https enforcement
        // if the browser tries to connect via http:// enforce that it uses https://
        res.redirect(301, `https://${ req.header('host') }${ req.url }`);

      } else {
        next();
      }
    });
  }
}