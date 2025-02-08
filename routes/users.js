// console.logD('DEBUG: routes: users', 'cyan');

const express = require('express');
const router = express.Router();

// req.user will populate with undefined or an object with the user data if passport has authenticated
router.route('/get').get((req, res) => {
  console.logD('DEBUG: routes: /users/get: ', 'blue');
  const send = req.user || false;
  res.status(200).json(send);
});

module.exports = router;