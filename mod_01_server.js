/*    

    INTERFACE - WILD CARD
      0.0.0.0 accepts connections on any network interface

    COMMON PORT USE:
      http                80
      https               443
      local               3000

    NOTE:
      the heroku proxy server will send all requests to process.env.PORT inlcuding http and https
      const PORT = process.env.PORT || 3000;
*/

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
    console.log('\x1b[32m' + 'DEBUG: server: started: port ' + port + '\x1b[30m');
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
    console.log('\x1b[32m' + 'DEBUG: local server: started: port ' + port + '\x1b[30m');
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

// does not appear useful as it fires right after listen()
// server.on('listening', () => {
//   console.log('\x1b[32m' + 'DEBUG: server: listening: ' + '\x1b[30m');
// });
