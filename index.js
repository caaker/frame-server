import './global.js';
import express from 'express';
import { configureShutdown } from './mod_00_shutdown.js';
import { configureCORS } from './mod_00_cors.js';
import { startServer } from './mod_01_server.js';
import { startWebsocketServer } from './mod_02_ws.js';
import { configureRedirect } from './mod_01_redirect.js';
import { session_instance } from './mod_4_session.js';
import { passport } from './mod_5_pass.js';

// configure and start
configureShutdown();
const app = express();
app.enable('trust proxy');
configureCORS(app);
configureRedirect(app);
const server = startServer(app);
startWebsocketServer(server);

// app it up
app.use(express.json());
app.use('/', express.static('./dist'));
app.use(session_instance);
app.use(passport.initialize());
app.use(passport.session());

