// update to a simple index.js later

export { articles } from './routes/articles.js';
export { auth }     from './routes/auth.js';
export { users }    from './routes/users.js';
export { test }     from './routes/test.js';

export const routes = {
  articles,
  auth,
  users,
  test
};