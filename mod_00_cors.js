console.log('DEBUG: CORS:');

const cors = require('cors');

function exportCors(app) {

  // configure CORS for a specific domain
  const corsOptions = {
    origin: 'https://caaker.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));
}

module.exports = exportCors;



