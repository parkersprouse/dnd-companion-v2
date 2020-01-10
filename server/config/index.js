require('dotenv').config();

module.exports = {
  cookie_secret: process.env.COOKIE_SECRET,
  db: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  pusher: {
    id: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
  },
  sentry_url: process.env.SENTRY_URL,
  sparkpost_api_key: process.env.SPARKPOST_API_KEY,
};
