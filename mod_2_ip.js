console.log('DEBUG: IP:');

function ipexport(app) {
  app.use((req, res, next) => {

    // x-forwarded-for is often populated by a proxy server to hold the real clients ip address
    const ip1 = req.headers['x-forwarded-for'];

    // ip address directly from the request socket if there is no proxy this will be correct
    const ip2 = req.socket.remoteAddress;

    // later we will log this, currently not used
    const ip =  ip1 || ip2;
    next();
  });
}

module.exports = ipexport;
