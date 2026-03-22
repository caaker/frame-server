import mongoose from 'mongoose';
import * as schema from './mongoose-schema.js';

import './mongoose-connect.js';

/*
 *
 * LAYER 1 - FINGER PRINTS
 *
**/

export const getFingerPrint = (id) => {
  return getOne('FingerPrint', schema.FingerPrint, id);
};

export const saveFingerPrint = (obj) => {
  return saveOne('FingerPrint', schema.FingerPrint, obj);
};

export const updateFingerPrint = (id, obj) => {
  return updateOne('FingerPrint', schema.FingerPrint, id, obj);
};

export const deleteFingerPrint = (id) => {
  return deleteOne('FingerPrint', schema.FingerPrint, id);
};


/*
 *
 * LAYER 1 - ARTICLE METHODS
 *
**/

export const getArticle = (id) => {
  return getOne('Article', schema.Article, id);
};

export const saveArticle = (obj) => {
  return saveOne('Article', schema.Article, obj);
};

export const updateArticle = (id, obj) => {
  return updateOne('Article', schema.Article, id, obj);
};

export const deleteArticle = (id) => {
  return deleteOne('Article', schema.Article, id);
};

export const getAllArticles = () => {
  return getAll('Article', schema.Article);
};

/*
 *
 * LAYER 1 - USER METHODS
 *
**/

export const getUser = (id) => {
  return getOne('User', schema.User, id);
};

export const saveUser = (obj) => {
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