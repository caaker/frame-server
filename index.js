import './global';

import {shutdown} from './mod_00_shutdown.js';
shutdown();

console.logD('----------------------------------------------------------------------------------------------------');
console.logD('                                         STARTING-4                                                 ');
console.logD('----------------------------------------------------------------------------------------------------');
console.logD('DEBUG: index.js: time: ' + time());
console.logD('DEBUG: current node version: ' + process.version);

import express from 'express';

const app = express();

// the web server is often behind a proxy server and we want to trust it
app.enable('trust proxy');

// allow cross origin access with cors module
// require('./mod_00_cors')(app);

// require('./index-1');
