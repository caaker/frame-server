import './global';

import { cofigureShutdown } from './mod_00_shutdown.js';
cofigureShutdown();

console.logD('---------*---------*---------*---------*---------*---------*---------*---------*---------*---------*');
console.logD('DEBUG: index.js: time: ' + time());
console.logD('DEBUG: current node version: ' + process.version);

import express from 'express';
const app = express();
app.enable('trust proxy');

import { configureCORS } from './mod_00_cors.js';
configureCORS(app);
import { startServer } from './mod_01_server.js';
const server = startServer(app);

import { websocket } from './mod_3_ws';
websocket(server);

// require('./index-1');
