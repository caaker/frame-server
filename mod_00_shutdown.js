module.exports = (server) => {
  const exit = () => {
    console.logD('DEBUG: server: closing...', 'green');
    server.close(() => process.exit(0));
  };
  process.on('SIGINT', exit);
  process.on('SIGTERM', exit);
};