// shutdownHandler.js

function handleShutdown() {

  // control C
  process.on("SIGINT", () => {
    console.logD('DEBUG: server: closed: ( SIGINT ) ', 'green');
    process.exit();
  });

  // used by render
  process.on("SIGTERM", () => {
    console.logD('DEBUG: server: closed: ( SIGTERM ) ', 'green');
    process.exit();
  });
}

module.exports = handleShutdown;
