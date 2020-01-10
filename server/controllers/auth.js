const bcrypt = require('bcrypt');

const { buildToken, call, isEmail, respond } = require('../lib');
const {
  cookie_token,
  db_err_duplicate,
  http_ok,
  http_bad_request,
  http_server_error,
} = require('../config/constants');
const { Op } = require('../config/db');
const User = require('../models/user');

module.exports = {

  async register(req, res) {
    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(req.body.password, salt);
    const [err, data] = await call(User.create({
      email: req.body.email,
      name: req.body.name,
      pw_hash,
    }));
    if (err) {
      let message = 'There was an unknown problem when creating your account';
      if (err.name === db_err_duplicate) {
        const error = err.errors[0];
        if (error.path.includes('username')) {
          message = 'An account with that username already exists';
        } else if (error.path.includes('email')) {
          message = 'An account with that e-mail address already exists';
        }
      }
      return respond(res, http_bad_request, message);
    }

    res.cookie(cookie_token, buildToken(data.id), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
    respond(res, http_ok);
  },

  async login(req, res) {
    const [err, data] = await call(User.findOne({
      where: { email: { [Op.iLike]: req.body.email } },
    }));
    if (err) {
      return respond(res, http_server_error, 'There was an unknown problem logging you in',
        err.message);
    } else if (!data) {
      return respond(res, http_bad_request, 'Your e-mail or password was incorrect');
    }
    const match = bcrypt.compareSync(req.body.password, data.pw_hash);
    if (!match)
      return respond(res, http_bad_request, 'Your e-mail or password was incorrect');

    res.cookie(cookie_token, buildToken(data.id), {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });
    respond(res, http_ok);
  },

  logout(req, res) {
    res.clearCookie(cookie_token);
    respond(res, http_ok);
  },

};
