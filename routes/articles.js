// console.logD('DEBUG: routes: articles', 'cyan');

import { Router } from 'express';
import DBM from '../mongo/mongoose.js';

const router = Router();

router.route('/get').get((req, res) => {
  console.logD('DEBUG: routes: /articles/get: ', 'blue');
  DBM.getAllArticles().then( (results) => {
    res.status(200).json(results);
  }).catch(errorHandler);
});

router.route('/add').post((req, res) => {
  console.logD('DEBUG: routes: /articles/add: ', 'blue');
  DBM.saveArticle(req.body).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

router.route('/put/:_id').put((req, res) => {
  console.logD('DEBUG: routes: /articles/put: ', 'blue');
  DBM.updateArticle(req.params._id, req.body).then((val) => {
    console.logD( val, 'blue' );
    res.status(200).json(val);
  }).catch(errorHandler);
});

router.route('/delete/:_id').delete((req, res) => {
  console.logD('DEBUG: routes: /articles/delete: ', 'blue');
  DBM.deleteArticle(req.params._id).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

function errorHandler(err) {
  console.logD('DEBUG: routes: articles crud: error:', 'red');
  // console.logD(error);
}

export { router as articles };