const users = new Map();

users.getAll = function() {
  const arr = [];
  for(const id of users.keys()) {
    arr.push({
      id: users.get(id)
    });
  }
  return arr;
};

module.exports = users;
