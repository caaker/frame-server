import * as model from './mongoose-schema.js';
import './mongoose-connect.js';

// FINGERPRINT
const getFingerPrint = (id) => model.FingerPrint.find({ _id: id });
const saveFingerPrint = (obj) => new model.FingerPrint(obj).save();
const updateFingerPrint = (id, obj) => model.FingerPrint.updateOne({ _id: id }, obj);
const deleteFingerPrint = (id) => model.FingerPrint.deleteOne({ _id: id });

// ARTICLE
const getArticle = (id) => model.Article.find({ id_google: id });
const saveArticle = (obj) => new model.Article(obj).save();
const updateArticle = (id, obj) => model.Article.updateOne({ _id: id }, obj);
const deleteArticle = (id) => model.Article.deleteOne({ _id: id });
const getAllArticles = () => model.Article.find({}).sort({ timestamp: -1 });

// USER
const getUser = (id) => model.User.find({ id_google: id });
const saveUser = (obj) => new model.User(obj).save();

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