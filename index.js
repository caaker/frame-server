import './global.js';
import express from 'express';
import { configureShutdown }    from './mod_00_shutdown.js';
import { configureCORS }        from './mod_00_cors.js';
import { configureRedirect }    from './mod_00_redirect.js';
import { startServer }          from './mod_01_server.js';
import { startWebsocketServer } from './mod_01_ws.js';
import { session_instance }     from './mod_02_session.js';
import { passport }             from './mod_03_pass.js';
import { detectErrors }         from './mod_10_detectErrors.js';
import { routes }               from './mod_6_routes.js'


// configure and start
configureShutdown();
const app = express();
app.enable('trust proxy');
configureCORS(app);
configureRedirect(app);
const server = startServer(app);
startWebsocketServer(server);

// app
app.use(express.json());
app.use('/', express.static('./dist'));
app.use(session_instance);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/articles',  routes.articles);
app.use('/users',     routes.users);
app.use('/auth',      routes.auth);
app.use('/test',      routes.test);

//
detectErrors(app);


