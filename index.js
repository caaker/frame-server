import './global.js';
import express from 'express';

import { configureShutdown }    from './mod_00_shutdown.js';
import { configureCORS }        from './mod_00_cors.js';
import { configureRedirect }    from './mod_00_redirect.js';

import { startServer }          from './mod_01_server.js';
import { startWebsocketServer } from './mod_01_websocket.js';
import { session_instance }     from './mod_02_session.js';
import { passport }             from './mod_03_passport.js';
import { detectErrors }         from './mod_10_detectErrors.js';

import { router }               from './routes/index.js';

// configure
configureShutdown();
const app = express();
app.enable('trust proxy');
configureCORS(app);
configureRedirect(app);

// app
app.use(express.json());
app.use('/', express.static('./dist'));
app.use(session_instance);
app.use(passport.initialize());
app.use(passport.session());

// router - use
app.use(router);

// error handling
detectErrors(app);

// start servers
const server = startServer(app);
startWebsocketServer(server);