console.log('DEBUG: server:');

/*
  render and heroku have a proxy server that terminates https and sends data as http
  render detects port via $PORT
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
  startServer(server, 3000, 'local');
  return server;
}

module.exports = exportServer;
