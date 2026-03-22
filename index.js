import './global.js';
import express from 'express';
import { configureShutdown }    from './mod_00_shutdown.js';
import { configureCORS }        from './mod_00_cors.js';
import { configureRedirect }    from './mod_00_redirect.js';
import { startServer }          from './mod_01_server.js';
import { startWebsocketServer } from './mod_01_ws.js';
import { session_instance }     from './mod_02_session.js';
import { passport }             from './mod_03_passport.js';
import { detectErrors }         from './mod_10_detectErrors.js';


import { articles } from './routes/articles.js';
import { auth }     from './routes/auth.js';
import { users }    from './routes/users.js';
import { test }     from './routes/test.js';

// configure
configureShutdown();
const app = express();
app.enable('trust proxy');
configureCORS(app);
configureRedirect(app);

// start servers
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
app.use('/articles',  articles);
app.use('/users',     users);
app.use('/auth',      auth);
app.use('/test',      test);

detectErrors(app);


