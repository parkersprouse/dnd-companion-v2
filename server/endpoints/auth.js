const bcrypt = require('bcrypt');

const { buildToken, call, respond } = require('./lib');
const { db_err_duplicate, http_ok, http_bad_request, http_server_error } = require('../config/constants');
const User = require('../models/user');

module.exports = {

  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
      return respond(res, http_bad_request, 'Please make sure all required fields are filled out');

    const [err, data] = await call(User.findOne({ where: { username: { $iLike: username } } }));
    if (err)
      return respond(res, http_server_error, 'There was an unknown problem when trying to log you in', err.message);
    if (!data)
      return respond(res, http_bad_request, 'Your username or password was incorrect');

    const match = bcrypt.compareSync(password, data.pw_hash);
    if (!match)
      return respond(res, http_bad_request, 'Your username or password was incorrect');

    res.cookie('token', buildToken(data.id), { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, signed: true, secure: process.env.NODE_ENV === 'production' });
    respond(res, http_ok);
  },

  async register(req, res) {
    const { confirm_password, email, name, password, username } = req.body;
    if (!email || !password || !confirm_password || !username)
      return respond(res, http_bad_request, 'Please make sure all required fields are filled out');
    else if (!isEmail(email))
      return respond(res, http_bad_request, 'Please make sure your e-mail is valid');
    else if (password !== confirm_password)
      return respond(res, http_bad_request, 'Please make sure the passwords match');
    else if (password.length < 8)
      return respond(res, http_bad_request, 'Password must be at least 8 characters');

    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(password, salt);
    const [err, data] = await call(Users.create({ name, email, pw_hash, username }));
    if (err) {
      let message = 'There was an unknown problem when creating your account';
      if (err.name === db_err_duplicate) {
        if (err.errors[0].path === 'username')
          message = 'An account with that username already exists';
        else if (err.errors[0].path === 'email')
          message = 'An account with that e-mail address already exists';
        return respond(res, http_bad_request, message);
      }
    }

    res.cookie('token', buildToken(data.id), { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, signed: true, secure: process.env.NODE_ENV === 'production' });
    respond(res, http_ok);
  },

};
