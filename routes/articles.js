const router = require('express').Router();
const DBM = require('../mongo/mongoose');

// read
router.route('/get').get((req, res) => {
  DBM.getAllArticles().then( (results) => {
    console.log('DEBUG: route: articles: getAllArticles: length: ' + results.length);
    res.status(200).json(results);
  }).catch(errorHandler);
});

// create
router.route('/add').post((req, res) => {
  DBM.saveArticle(req.body).then((val) => {
    res.status(200).json(val);
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
  // res.status(500).send('DEBUG: MONGOOSE: INTERNAL ERROR', err); // give access to res
}

module.exports = router;




