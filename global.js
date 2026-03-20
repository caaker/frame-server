global.console.logD = function(arg1, arg2) {
  const on = true;
  if (on) {
    const colors_hash = {
      blue: '\x1b[34m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      cyan: '\x1b[36m',
      magenta: '\x1b[35m',
      white: '\x1b[37m',
      black: '\x1b[30m'
    };
    const start_string = colors_hash[arg2] || colors_hash.blue;
    const end_string = '\x1b[0m';
    console.log(start_string + arg1 + end_string);
  }
};

global.time = function () {
  const date = new Date();
  const time = date.toLocaleTimeString();  
  return time;
}
