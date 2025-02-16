global.console.logD = function(arg1, arg2) {
  const on = true;
  if (on) {
    const colorCodes = {
      blue: '\x1b[34m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      cyan: '\x1b[36m',
      magenta: '\x1b[35m',
      white: '\x1b[37m',
      black: '\x1b[30m',
      reset: '\x1b[0m'
    };
    const colorCode = colorCodes[arg2] || colorCodes.blue;
    const resetCode = colorCodes['reset'];
    console.log(colorCode + arg1 + resetCode);
  }
};

global.time = function () {
  const date = new Date();
  const time = date.toLocaleTimeString();  
  return time;
}
