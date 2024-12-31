const router = require('express').Router();
const DBM = require('../mongo/mongoose');

// create
router.route('/add').post((req, res) => {
  DBM.saveArticle(req.body).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

// read
router.route('/get').get((req, res) => {
  DBM.getAllArticles().then( (results) => {
    res.status(200).json(results);
  }).catch(errorHandler);
});

// update
router.route('/put/:_id').put((req, res) => {
  DBM.updateArticle(req.params._id, req.body).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

// delete
router.route('/delete/:_id').delete((req, res) => {
  DBM.deleteArticle(req.params._id).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

// handles error, combine this with links error handler, and require it from external file later
function errorHandler(err) {
  console.error('DEBUG: DBM: Error: ');
  console.error(err);
  res.status(500).send('DEBUG: MONGOOSE: INTERNAL ERROR', err);
}

module.exports = router;




