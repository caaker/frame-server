// render has a proxy server that terminates https and sends data as http
import http from 'http';

const configureServer = (server, name) => {
  const port = process.env.PORT || 3000;
  server.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.error(`DEBUG: Error starting ${name} server module`);
      process.exit(1);
    }
    console.logD(`DEBUG: ${name} server: started: port ${port}`, 'green');
  });
};
export const startServer = (app) => {
  const server = http.createServer(app);
  configureServer(server, 'local');
  return server;
};