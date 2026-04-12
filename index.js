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
import { api_openweather }      from './routes/api_openweather.js';
import { api_chatgpt }          from './routes/api_chatgpt.js';
import { api_grok }             from './routes/api_grok.js';
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
app.use('/api_openweather', api_openweather);
app.use('/api_chatgpt',     api_chatgpt);
app.use('/api_grok',        api_grok);
app.use('/articles',        articles);
app.use('/auth',            auth);
app.use('/test',            test);
app.use('/users',           users);

// error handling
detectErrors(app);

// start servers
const server = startServer(app);
startWebsocketServer(server);