const express = require('express');
const router = express.Router();

// req.user will populate with undefined or an object with the user data if passport has authenticated
router.route('/get').get((req, res) => {
  // console.log('DEBUG: route:' + req.protocol + '://' + req.get('host'));
  const send = req.user || false;
  res.status(200).json(send);
});

module.exports = router;