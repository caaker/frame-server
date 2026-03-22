import mongoose from 'mongoose';
import * as schema from './mongoose-schema.js';

import './mongoose-connect.js';

/*
 *
 * LAYER 1 - FINGER PRINTS
 *
**/

const getFingerPrint = (id) => {
  return getOne('FingerPrint', schema.FingerPrint, id);
};

const saveFingerPrint = (obj) => {
  return saveOne('FingerPrint', schema.FingerPrint, obj);
};

const updateFingerPrint = (id, obj) => {
  return updateOne('FingerPrint', schema.FingerPrint, id, obj);
};

const deleteFingerPrint = (id) => {
  return deleteOne('FingerPrint', schema.FingerPrint, id);
};


/*
 *
 * LAYER 1 - ARTICLE METHODS
 *
**/

const getArticle = (id) => {
  return getOne('Article', schema.Article, id);
};

const saveArticle = (obj) => {
  return saveOne('Article', schema.Article, obj);
};

const updateArticle = (id, obj) => {
  return updateOne('Article', schema.Article, id, obj);
};

const deleteArticle = (id) => {
  return deleteOne('Article', schema.Article, id);
};

const getAllArticles = () => {
  return getAll('Article', schema.Article);
};

/*
 *
 * LAYER 1 - USER METHODS
 *
**/

const getUser = (id) => {
  return getOne('User', schema.User, id);
};

const saveUser = (obj) => {
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

export const database = {
  getFingerPrint,
  saveFingerPrint,
  updateFingerPrint,
  deleteFingerPrint,
  getArticle,
  saveArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getUser,
  saveUser
};