export const detectErrors = (app) => {
  app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).send('Something went wrong');
  });
}
