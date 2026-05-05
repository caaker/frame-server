import express from 'express';
import { configureShutdown } from './mod_00_shutdown.js';
import { configureCORS }     from './mod_00_cors.js';
import { configureRedirect } from './mod_00_redirect.js';

const configure = (app) => {

  // best practice for server shutdown
  configureShutdown(); 

  // allow other origins to use this server
  configureCORS(app);

  // enforce https
  configureRedirect(app);

  // convert body json strings to javascript objects
  app.use(express.json());

  // serve static files
  app.use('/', express.static('./dist'));

};

export { configure };