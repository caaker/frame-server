// render has a proxy server that terminates https and sends data as http
import http from 'http';

const configureServer = (server, port, name) => {

  server.on('error', (err) => {
    console.logD(`DEBUG: Server failed to start: ${err.message}`, 'red');
    process.exit(1);
  });

  server.listen(port, '0.0.0.0', () => {
    console.logD(`DEBUG: ${name} server: started: port ${port}`, 'green');
  });
};

export const startServer = (app) => {
  console.logD(`DEBUG: Module: server: `);
  const server = http.createServer(app);
  const port = process.env.PORT || 3000;
  configureServer(server, port, 'local');
  return server;
};