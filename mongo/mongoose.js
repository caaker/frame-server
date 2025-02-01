const mongoose = require('./mongoose-connect');
const schema = require('./mongoose-schema.js');

/*
 *
 * LAYER 1 - FINGER PRINTS
 *
**/

exports.getFingerPrint = (id) => {
  return getOne('FingerPrint', schema.FingerPrint, id);
};

exports.saveFingerPrint = (obj) => {
  return saveOne('FingerPrint', schema.FingerPrint, obj);
};

exports.updateFingerPrint = (id, obj) => {
  return updateOne('FingerPrint', schema.FingerPrint, id, obj);
};

exports.deleteFingerPrint = (id) => {
  return deleteOne('FingerPrint', schema.FingerPrint, id);
};


/*
 *
 * LAYER 1 - ARTICLE METHODS
 *
**/

exports.getArticle = (id) => {
  return getOne('Article', schema.Article, id);
};

exports.saveArticle = (obj) => {
  return saveOne('Article', schema.Article, obj);
};

exports.updateArticle = (id, obj) => {
  return updateOne('Article', schema.Article, id, obj);
};

exports.deleteArticle = (id) => {
  return deleteOne('Article', schema.Article, id);
};

exports.getAllArticles = () => {
  return getAll('Article', schema.Article);
};

/*
 *
 * LAYER 1 - USER METHODS
 *
**/

exports.getUser = (id) => {
  return getOne('User', schema.User, id);
};

exports.saveUser = (obj) => {
  return saveOne('User', schema.User, obj);
};


/*
 *
 * LAYER 0 - MONGOOSE - SINGLE CRUD OPERATIONS - MOVE TO ANOTHER FILE
 *
**/


const getOne = (name, schema, id) => {
  const Model = mongoose.model(name, schema);
  return Model.find({ id_google: id });
};

const saveOne = (name, schema, obj) => {
  const Model = mongoose.model(name, schema);
  return new Model(obj).save();
};

const updateOne = (name, schema, id, obj) => {
  const Model = mongoose.model(name, schema);
  return Model.updateOne({_id: id}, obj);
};

const deleteOne = (name, schema, id) => {
  const Model = mongoose.model(name, schema);
  return Model.deleteOne({_id: id});
};


/*
 *
 * LAYER 0 - MONGOOSE - ADDITIONAL OPERATIONS
 *
**/


const getAll = (name, schema) => {
  const Model = mongoose.model(name, schema);
  return Model.find({});
};

