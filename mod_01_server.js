console.log('DEBUG: server:');

/*
  render has a proxy server that terminates https and sends data as http
  render detects port via process.env.PORT among other ways
*/

const http = require('http');

function startServer(server, port, name) {
  server.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.error(`DEBUG: Error starting ${name} server module`);
      process.exit(1);
    }
    console.logD(`DEBUG: ${name} server: started: port ${port}`, 'green');
  });
}

function exportServer(app) {
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;
  startServer(server, port, 'local');
  return server;
}

module.exports = exportServer;