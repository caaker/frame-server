console.log('DEBUG: server:');
const port = process.env.PORT || 80;
const http = require('http');

// 0.0.0.0 accepts connections on any network interface
function server(app) {
  return http.createServer(app).listen(port, '0.0.0.0', (err) => {
    if(err){
      console.error('DEBUG: Error starting server module');
      process.exit(1);     
    }
    console.log('\x1b[32m' + 'DEBUG: server: started: port ' + port + '\x1b[30m');
  });
}
// consider sigint and sigterm handlers
module.exports = server;
