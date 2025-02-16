const mongoose = require('mongoose');

mongoose.connection.on('connecting', () => {
  console.logD('DEBUG: mongoose: connecting', 'cyan');
});

mongoose.connection.on('connected', () => {
  console.logD('DEBUG: mongoose: connected', 'cyan');
});

mongoose.connection.on('open', () => {
  console.logD('DEBUG: mongoose: open', 'cyan');
});

mongoose.connection.on('disconnecting', () => {
  console.logD('DEBUG: mongoose: disconnecting', 'cyan');
});

mongoose.connection.on('disconnected', () => {
  console.logD('DEBUG: mongoose: disconnected', 'cyan');
});

mongoose.connection.on('reconnected', () => {
  console.logD('DEBUG: mongoose: reconnected', 'cyan');
});

mongoose.connection.on('error', (err) => {
  console.logD(`DEBUG: mongoose: error: ${err}`, 'cyan');
});

mongoose.connection.on('close', () => {
  console.logD('DEBUG: mongoose: close', 'cyan');
});

mongoose.connection.on('fullsetup', () => {
  console.logD('DEBUG: mongoose: fullsetup', 'cyan');
});

mongoose.connection.on('all', () => {
  console.logD('DEBUG: mongoose: all', 'cyan');
});

mongoose.connection.on('reconnectFailed', () => {
  console.logD('DEBUG: mongoose: reconnectFailed', 'cyan');
});
