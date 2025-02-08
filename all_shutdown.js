// shutdownHandler.js

function handleShutdown() {
  process.on("SIGINT", () => {
    console.logD('DEBUG: server: closed: port ', 'green');
    process.exit();
  });

  process.on("SIGTERM", () => {
    console.logD('DEBUG: server: closed: port ', 'green');
    process.exit();
  });
}

module.exports = handleShutdown;
