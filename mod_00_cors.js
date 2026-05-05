import cors from 'cors';
/*
options removed because they are default as follows:
  methods: ['GET, PUT, POST, DELETE, HEAD , PATCH']
*/
export const configureCORS = (app) => {
  console.logD(`DEBUG: Module: cors: `);
  const corsOptions = {
    origin: [
      'https://chris-temp-level-0.github.io', 
      'https://caaker.github.io', 
      /^https:\/\/.*\.github\.dev(:[0-9]+)?$/
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  app.use(cors(corsOptions));
};
