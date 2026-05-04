/*

The software architecure is a modular monolith as it handles:

    - http server
        - static file hosting
        - api routes
    - web socket server

It can easily be deconstructued to use different technologies as needed.

*/

import './global.js';

// configure monolith
import express from 'express';
import { configureShutdown }    from './mod_00_shutdown.js';
import { configureCORS }        from './mod_00_cors.js';
import { configureRedirect }    from './mod_00_redirect.js';
import { session_instance }     from './mod_02_session.js';
import { passport }             from './mod_03_passport.js';
import { router }               from './routes/index.js';

// run monolith and detect errors
import { startServer }          from './mod_01_server.js';
import { startWebsocketServer } from './mod_01_websocket.js';
import { detectErrors }         from './mod_10_detectErrors.js';

// ...
configureShutdown();
const app = express();
app.enable('trust proxy');
configureCORS(app);
configureRedirect(app);
app.use(express.json());
app.use('/', express.static('./dist'));
app.use(session_instance);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

// ...
detectErrors(app);
const server = startServer(app);
startWebsocketServer(server);