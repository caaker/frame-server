export const configureShutdown = (server) => {
  const shutdown = (signal) => {
    console.logD(`DEBUG: received ${signal}. shutting down gracefully...`, 'green');
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};