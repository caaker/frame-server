const fs = require('fs');
const DBM = require('./mongoose');
const FILE = 'articles.json';

// Use fs which is built into node.js to read the file contents of articles.json
fs.readFile(FILE, 'utf8', (err, contents) => {
  parseFile(contents);
});

// the export file from Compass create JSON in the form of an array of objects
async function parseFile(contents) {
  await loopThroughData(JSON.parse(contents));
}

// loop through this array and save each object to the database
async function loopThroughData(array) {
  for( let i = array.length ; i-- ; i >= 0) {
    await saveToDB(i, array[i]);
  }
}

// save to the database
async function saveToDB(i, article) {
  await DBM.saveArticle(article);
  console.log('article saved', i);
}
