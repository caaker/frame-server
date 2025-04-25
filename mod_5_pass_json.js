console.logD('DEBUG: passport_json:');
const fs = require('fs');
const path = require('path');
const { getProps, serialize } = require('./mod_5_pass_helper');

const path_file = path.join(__dirname, 'users.json');

function readFile() {
  if (!fs.existsSync(path_file)) {
    fs.writeFileSync(path_file, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(path_file));
}

function writeFile(users) {
  fs.writeFileSync(path_file, JSON.stringify(users, null, 2)); // Pretty print the JSON
}

function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = getProps(profile);
  const users = readFile();
  const user_found = users.find(user => user.id_google === props.id_google);
  user_found ? done(null, user_found) : saveUser(done, props);
}

function saveUser(done, props) {
  const users = readFile();
  users.push(props);
  writeFile(users);
  done(null, props);
}

// req.user is populated here
function deserialize(id_google, done) {
  const users = readFile();
  const user_found = users.find(user => user.id_google === id_google);
  console.log('DEBUG: pass_json: deserialize: ');
  if (user_found) {
    done(null, user_found);
  } else {
    done(new Error('User not found'), null);
  }
}

module.exports = {
  getOrSaveUser,
  deserialize,
  serialize
};
