console.log('DEBUG: server:');
const http = require('http');

// http server
function HTTPserver(server) {
  const port = 80;
  server.listen(port, '0.0.0.0', (err) => {
    if(err){
      console.error('DEBUG: Error starting server module');
      process.exit(1);     
    }
    console.logD('DEBUG: server: started: port ' + port, 'green');
  });
}

// local http server
function HTTPLocalServer(server) {
  const port = 3000;
  server.listen(port, '0.0.0.0', (err) => {
    if(err){
      console.error('DEBUG: Error starting local server module');
      process.exit(1);     
    }
    console.logD('DEBUG: local server: started: port ' + port, 'green');
  });
}

function exportServer(app) {
  // server can only listen on one port per trial and error
  const server = http.createServer(app);
  // HTTPserver(server);
  HTTPLocalServer(server);
  return server;
}

// consider sigint and sigterm handlers
module.exports = exportServer;
