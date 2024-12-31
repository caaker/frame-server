const router = require('express').Router();
const DBM = require('../mongo/mongoose');

// create
router.route('/add').post((req, res) => {
  DBM.saveLink(req.body).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

// read
router.route('/get').get((req, res) => {
  DBM.getAllLinks().then( (results) => {
    res.status(200).json(results);
  }).catch(errorHandler);
});

// update
router.route('/put/:_id').put((req, res) => {
  DBM.updateLink(req.params._id, req.body).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

// delete
router.route('/delete/:_id').delete((req, res) => {
  DBM.deleteLink(req.params._id).then((val) => {
    res.status(200).json(val);
  }).catch(errorHandler);
});

function errorHandler(err) {
  console.error('DEBUG: DBM: Error: ');
  console.error(err);
  res.status(500).send('DEBUG: MONGOOSE: INTERNAL ERROR', err);
}
module.exports = router;

/*
 *
 *
 *
**/

exports.saveLink = (obj) => {
  return saveOne('Link', schema.Link, obj);
};

exports.getLink = (id) => {
  return getOne('Link', schema.Link, id);
};

exports.updateLink = (id, obj) => {
  return updateOne('Link', schema.Link, id, obj);
};

exports.deleteLink = (id) => {
  return deleteOne('Link', schema.Link, id);
};

exports.getAllLinks = () => {
  return getAll('Link', schema.Link);
};

/*
 *
 *
 *
**/

schema.Link = new Schema({
  link:       { type: String, required: true  },
  owner:      { type: String, required: true, default: '5eebf1dc9148400351a49dd0' },
  timestamp:  { type: Date,   required: true, default: Date.now }
});
