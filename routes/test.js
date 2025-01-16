const express = require('express');
const router = express.Router();

router.route('/headers').get((req, res) => {
  res.send(`<pre>${JSON.stringify(req.headers, null, 2)}</pre>`);
});

router.route('/cookies').get((req, res) => {
  console.log('Session Cookie:');
  res.send(`<pre>${JSON.stringify(req.cookies, null, 2)}</pre>`);
});


module.exports = router;