const express = require('express');
const router = express.Router();

router.route('/get').get((req, res) => {
  const send = req.user || false;
  res.status(200).json(send);
});

module.exports = router;

/*  COMMENTS
    req.user will populate with undefined or an object with the user data
    undefined will cause an error client side so set to false instead
*/