const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');

const config = require('../../config');
const User = require('../../models/user');

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

  // W3C email regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  isEmail(text) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text);
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

  async verifyToken(req, res, next) {
    const unauthorized = () => {
      res.clearCookie('token');
      res.status(403).send();
    }

    const { token } = req.signedCookies;
    if (token) {
      try {
        const verified = jwt.verify(token, config.jwt_secret);
        const [err, data] = await module.exports.call(User.findOne({ where: { id: verified.id } }));
        if (err || !data)
          return unauthorized();
        req.user_obj = data.dataValues; // pass the logged in user's data to the endpoint resolver
        next();
      }
      catch(e) {
        unauthorized();
      }
    }
    else {
      unauthorized();
    }
  },

};
