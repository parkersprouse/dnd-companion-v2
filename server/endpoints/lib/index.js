const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');

const config = require('../../config');

module.exports = {

  buildToken(id) {
    return jwt.sign({ id }, config.jwt_secret);
  },

  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => {
        Sentry.captureException(err);
        return [err];
      });
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

  verifyToken(req, res, next) {
    const { token } = req.signedCookies;
    console.log(token);
    if (token) {
      try {
        const verified = jwt.verify(token, config.jwt_secret);
        req.user_id = verified.id;
        next();
      }
      catch(e) {
        res.clearCookie('token');
        res.status(403).send();
      }
    }
    else {
      res.clearCookie('token');
      res.status(403).send();
    }
  },

};
