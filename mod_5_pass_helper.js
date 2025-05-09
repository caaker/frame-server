console.logD('DEBUG: passport_helper:');

function getProps(profile) {
  const props = {};
  props.id_google = profile.id;
  props.email = profile.emails[0].value;
  props.name = profile.displayName;
  props.pic_url = profile.photos[0].value;
  props.type = profile._json.objectType;
  return props;
}

function userFound(done, props) {
  done(null, props);
}

function serialize(profile, done) {
  console.log('DEBUG: pass_help: serialize: ');
  done(null, profile.id_google);
}

module.exports = {
  getProps,
  userFound,
  serialize
};
