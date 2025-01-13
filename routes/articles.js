const router = require('express').Router();
const DBM = require('../mongo/mongoose');

// read
router.route('/get').get((req, res) => {
  // console.log('DEBUG: route:' + req.hostname);
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

// will catch errors when there is no connection, need to move this
function errorHandler(err) {
  console.error('DEBUG: routes: articles: error ');
}

module.exports = router;




