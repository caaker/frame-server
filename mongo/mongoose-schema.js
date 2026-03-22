import { Schema } from 'mongoose';

// implicits - id, __v

const FingerPrint = new Schema({
  agent:     { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

const User = new Schema({
  id_google: { type: String, required: true, unique: true },
  type:      { type: String, required: false },
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  pic_url:   { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

const Article = new Schema({
  link:       { type: String, required: true  },
  image:      { type: String, required: true  },
  title:      { type: String, required: true  },
  summary:    { type: String, required: true  },
  tag:        { type: String, required: true, default: 'health' },
  domain:     { type: String, required: true },
  owner:      { type: String, required: true, default: '5eebf1dc9148400351a49dd0' },
  timestamp:  { type: Date,   required: true, default: Date.now }
});

const Bookmark = new Schema({
  url:       { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = new Schema({
  from:      { type: String, required: true },
  to:        { type: String, required: true },
  timestamp: { type: Date,   required: true, default: Date.now }
});

export {
  FingerPrint,
  User,
  Article,
  Bookmark,
  Chat
};