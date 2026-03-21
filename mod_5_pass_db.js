console.logD('DEBUG: pass_db:');
import database from './mongo/mongoose.js';

export function serialize(profile, done) {
  console.log('DEBUG: pass_help: serialize: ');
  done(null, profile.id_google);
}
export function deserialize(id_google, done) {
  database.getUser(id_google).then((res) => {
    done(null, res[0]);
  });
}
export function getOrSaveUser(accessToken, refreshToken, profile, done) {
  const props = getProps(profile);
  database.getUser(props.id_google).then((response) => {
    response[0] ? userFound(done, props) : saveUser(done, props);
  }).catch((error) => {
    console.logD("DEBUG: passport_helper: getOrSaveUser:", 'red');
    done(error, null, "DEBUG: passport_helper: getOrSaveUser:");
  });
}

function userFound(done, props) {
  done(null, props);
}
function saveUser(done, props) {
  return database.saveUser(props).then(() => {
    done(null, props);
  });
}
function getProps(profile) {
  const props = {};
  props.id_google = profile.id;
  props.email = profile.emails[0].value;
  props.name = profile.displayName;
  props.pic_url = profile.photos[0].value;
  props.type = profile._json.objectType;
  return props;
}