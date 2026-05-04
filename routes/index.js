import { Router } from 'express';
const router = Router();

import { api_openweather } from './api_openweather.js';
import { api_chatgpt }     from './api_chatgpt.js';
import { api_grok }        from './api_grok.js';
import { articles }        from './articles.js';
import { auth }            from './auth.js';
import { test }            from './test.js';
import { users }           from './users.js';

router.use('/api_openweather', api_openweather);
router.use('/api_chatgpt',     api_chatgpt);
router.use('/api_grok',        api_grok);
router.use('/articles',        articles);
router.use('/auth',            auth);
router.use('/test',            test);
router.use('/users',           users);

export { router };