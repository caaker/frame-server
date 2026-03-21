require('./global');

require('./mod_00_shutdown')();

console.logD('----------------------------------------------------------------------------------------------------');
console.logD('                                         STARTING-4                                                 ');
console.logD('----------------------------------------------------------------------------------------------------');
console.logD('DEBUG: index.js: time: ' + time());
console.logD('DEBUG: current node version: ' + process.version);

const express = require('express');
const app = express();
 
require('./index-1');
