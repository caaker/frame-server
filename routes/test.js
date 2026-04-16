import { Router } from 'express';
const router = Router();

router.route('/headers').get((req, res) => {
  res.send(`<pre>${JSON.stringify(req.headers, null, 2)}</pre>`);
});

router.route('/cookies').get((req, res) => {
  res.send(`<pre>${JSON.stringify(req.cookies, null, 2)}</pre>`);
});

export { router as test };