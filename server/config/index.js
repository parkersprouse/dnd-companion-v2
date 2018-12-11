require('dotenv').config();

var config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: process.env.DB_SSL
  },
  cookie_secret: process.env.COOKIE_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  sentry_url: process.env.SENTRY_URL,
  sparkpost_api_key: process.env.SPARKPOST_API_KEY
}

module.exports = config;
