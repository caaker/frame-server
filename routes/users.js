import { Router } from 'express';
const router = Router();

router.route('/get').get((req, res) => {
  console.logD('DEBUG: routes: /users/get: ', 'blue');
  const send = req.user || false;
  res.status(200).json(send);
});

export { router as users }; 