import cors from 'cors';

export const configureCORS = (app) => {
  const corsOptions = {
    origin: [
      'https://chris-temp-level-0.github.io', 
      'https://caaker.github.io', 
      /^https:\/\/.*\.github\.dev(:[0-9]+)?$/
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };
  app.use(cors(corsOptions));
};
