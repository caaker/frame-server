// This software architecture is a modular monolith
import './global.js';
import express from 'express';
import { configure }            from './mod_00__configure.js';
import { session_instance }     from './mod_10_session.js';
import { passport }             from './mod_10_passport.js';
import { router }               from './routes/index.js';
import { detectErrors }         from './mod_20_detectErrors.js';
import { startServer }          from './mod_20_server.js';
import { startWebsocketServer } from './mod_20_websocket.js';

// configure server
const app = express();
configure(app);

// configure sessions and passport
app.use(session_instance);
app.use(passport.initialize());
app.use(passport.session());

// configure routes
app.use(router);

// configure error detection
detectErrors(app);

// start the https server
const server = startServer(app);

// start the websocket server
startWebsocketServer(server);