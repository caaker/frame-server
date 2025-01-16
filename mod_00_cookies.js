console.log('DEBUG: CookieParser:');
const cookieParser = require('cookie-parser');

function exportCookieParser(app) {
  app.use(cookieParser());
}

module.exports = exportCookieParser;