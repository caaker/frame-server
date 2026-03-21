const DEBUG_ON = true;

// similar to visible spectrum
const colors = { black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
global.console.logD = (msg, color = 'blue') => {
  if (!DEBUG_ON) return;
  const code = colors[color] || 34;
  console.log(`\x1b[${code}m${msg}\x1b[0m`);
};
global.time = () => new Date().toLocaleTimeString();

// moved here to make index.js more readable
console.logD('---------*---------*---------*---------*---------*---------*---------*---------*---------*---------*');
console.logD('DEBUG: index.js: time: ' + time());
console.logD('DEBUG: current node version: ' + process.version);

