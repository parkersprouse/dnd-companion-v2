const crypto = require('crypto');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');

const { cookie_token, http_unauthorized } = require('../config/constants');
const config = require('../config');
const User = require('../models/user');

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

  isEmail(text) {
    // W3C email regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text);
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

  validateParams(req, res, next) {
    const validation_errs = validationResult(req);
    if (!validation_errs.isEmpty()) {
      return module.exports.respond(res, http_bad_request, validation_errs.array()[0].msg);
    }
    next();
  },

  async verifyToken(req, res, next) {
    const unauthorized = () => {
      res.clearCookie(cookie_token);
      res.sendStatus(http_unauthorized);
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
