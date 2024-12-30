const port = process.env.PORT || 80;
const http = require('http');
console.log('DEBUG: server: port: ' + port );

// 0.0.0.0 means to accept connections on any network interface
function server(app) {
  return http.createServer(app).listen(port, '0.0.0.0', (err) => {
    if(err){
      console.error('DEBUG: Error starting server module');
      // console.log(err);
      process.exit(1);     
    }
    console.log('DEBUG: server: module started on port', port);
  });
}
// consider sigint and sigterm handlers
module.exports = server;
