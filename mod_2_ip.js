console.log('DEBUG: IP:');

function ip(app) {

  // called 8 times on a page reload, needs updating
  app.use((req, res, next) => {
    const ip1 = req.headers['x-forwarded-for'];
    const ip2 = req.socket.remoteAddress;
    const ip =  ip1 || ip2;
    next();
  });
}

module.exports = ip;


