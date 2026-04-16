export const detectErrors = (app) => {
  console.logD(`DEBUG: Module: detectErrors: `);
  app.use((err, req, res, _next) => {
    console.error(`${req.method} at ${req.path} >> error occurred:`, err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'no error message supplied',
      path: req.path,
      method: req.method
    });
  });
};