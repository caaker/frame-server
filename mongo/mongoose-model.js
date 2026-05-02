import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FingerPrintSchema = new Schema({
  agent:     { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

const UserSchema = new Schema({
  id_google: { type: String, required: true, unique: true },
  type:      { type: String, required: false },
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  pic_url:   { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

const ArticleSchema = new Schema({
  link:      { type: String, required: true },
  image:     { type: String, required: true },
  title:     { type: String, required: true },
  summary:   { type: String, required: true },
  tag:       { type: String, required: true, default: 'health' },
  domain:    { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

const BookmarkSchema = new Schema({
  url:       { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatSchema = new Schema({
  from:      { type: String, required: true },
  to:        { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

export const FingerPrint = model('FingerPrint', FingerPrintSchema);
export const User        = model('User', UserSchema);
export const Article     = model('Article', ArticleSchema);
export const Bookmark    = model('Bookmark', BookmarkSchema);
export const Chat        = model('Chat', ChatSchema);