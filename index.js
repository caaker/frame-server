import './global.js';
import express from 'express';

// modules
import { configureShutdown }    from './mod_00_shutdown.js';
import { configureCORS }        from './mod_00_cors.js';
import { configureRedirect }    from './mod_00_redirect.js';
import { startServer }          from './mod_01_server.js';
import { startWebsocketServer } from './mod_01_websocket.js';
import { session_instance }     from './mod_02_session.js';
import { passport }             from './mod_03_passport.js';
import { detectErrors }         from './mod_10_detectErrors.js';

// routes
import { agents_chatgpt }       from './routes/agents_chatgpt.js';
import { agents_grok }          from './routes/agents_grok.js';
import { articles }             from './routes/articles.js';
import { auth }                 from './routes/auth.js';
import { test }                 from './routes/test.js';
import { users }                from './routes/users.js';

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

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/agents_chatgpt',  agents_chatgpt);
app.use('/agents_grok',     agents_grok);
app.use('/articles',        articles);
app.use('/auth',            auth);
app.use('/test',            test);
app.use('/users',           users);

// error handling
detectErrors(app);

// start servers
const server = startServer(app);
startWebsocketServer(server);