import { Router } from 'express';
const router = Router();

router.route('/headers').get((req, res) => {
  res.send(`<pre>${JSON.stringify(req.headers, null, 2)}</pre>`);
});

export { router as test };