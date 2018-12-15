const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Sentry = require('@sentry/node');

const { cookie_token, http_bad_request, http_ok, http_unauthorized } = require('../../config/constants');
const config = require('../../config');
const mailer = require('../../config/mailer');
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

  isEmail(text) {
    // W3C email regex: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text);
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

  async sendRecoveryEmail(req, res) {
    const { call, isEmail, respond } = module.exports;

    if (!req.body.email || !isEmail(req.body.email))
      return respond(res, http_bad_request, 'Please make sure you enter an e-mail address');

    const [find_err, find_data] = await call(User.findOne({ where: { email: { $iLike: req.body.email } } }));
    if (find_err)
      return respond(res, http_bad_request, 'There was an unexpected error when attempting to send the e-mail');
    else if (!find_data)
      return respond(res, http_ok);

    const key = crypto.randomBytes(32).toString('hex');
    const user = find_data.get({ plain: true });
    const [update_err, update_data] = await call(User.update({ pw_reset_key: key }, { where: { email: { $iLike: req.body.email } } }));
    if (update_err || !update_data[0])
      return respond(res, http_bad_request, 'There was an unexpected error when attempting to send the e-mail');

    mailer({
      subject: "DnD Companion App Account Recovery",
      html_content: `A request was made to recover the account information associated with this e-mail address.<br /><br />\
                     Your username is: <b>${user.username}</b>.<br /><br />\
                     To reset your password, visit <a href='http://dnd.parkersprouse.me/account-recovery?key=${key}'>http://dnd.parkersprouse.me/account-recovery?key=${key}</a>.`,
      raw_content: `A request was made to recover the account information associated with this e-mail address. Your username is: ${user.username}. To reset your password, please visit http://dnd.parkersprouse.me/account-recovery?key=${key}`,
      addresses: [req.body.email]
    }, (success) => {
      if (success)
        return respond(res, http_ok);
      respond(res, http_bad_request, 'There was an unexpected error when attempting to send the e-mail');
    });
  },

  async verifyToken(req, res, next) {
    const unauthorized = () => {
      res.clearCookie(cookie_token);
      res.status(http_unauthorized).send();
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
