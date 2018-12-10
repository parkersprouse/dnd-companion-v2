const bcrypt = require('bcrypt');

const { call, isEmail, respond } = require('./lib');
const { db_err_duplicate, http_ok, http_bad_request, http_no_content, http_server_error } = require('../config/constants');
const User = require('../models/user');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(User.findAll({ attributes: ['email', 'username', 'name'] }));
    if (err)
      return respond(res, http_server_error, 'Failed to get all users');

    const users = data.map((user) => user.get({ plain: true }));
    respond(res, http_ok, null, users);
  },
  
  async getByID(req, res) {
    const { id } = req.params;

    const [err, data] = await call(User.findOne({ where: { id }, attributes: ['email', 'username', 'name'] }));
    if (err)
      return respond(res, http_server_error, 'Failed to get user');
    if (!data)
      return respond(res, http_no_content, 'No user found');

    respond(res, http_ok, null, data);
  },

  getMe(req, res) {
    req.params.id = req.user_obj.id;
    return module.exports.getByID(req, res);
  },

  async update(req, res) {
    if (req.body.email && !isEmail(req.body.email))
      return respond(res, http_bad_request, 'Your e-mail must be valid');

    const [err] = await call(User.update(req.body, { where: { id: req.user_obj.id } }));
    if (err) {
      let message = 'There was an unknown problem when updating your account';
      if (err.name === db_err_duplicate) {
        const error = err.errors[0];
        if (error.path.indexOf('username') > -1)
          message = 'An account with that username already exists';
        else if (error.path.indexOf('email') > -1)
          message = 'An account with that e-mail address already exists';
      }
      return respond(res, http_bad_request, message);
    }

    respond(res, http_ok);
  },

  async updatePassword(req, res) {
    const { password_current, password_new, password_new_confirm } = req.body;

    const [match_err, match_data] = await call(User.findOne({ where: { id: req.user_obj.id } }));
    if (match_err || !match_data)
      return respond(res, http_server_error);
    const match = bcrypt.compareSync(password_current, match_data.pw_hash);
    if (!match)
      return respond(res, http_bad_request, 'Current password incorrect');
    else if (!password_new || password_new !== password_new_confirm)
      return respond(res, http_bad_request, 'Passwords did not match');
    else if (password_new.length < 8)
      return respond(res, http_bad_request, 'Password must be at least 8 characters');

    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(password_new, salt);
    const [update_err, update_data] = await call(User.update({ pw_hash }, { where: { id: req.user_obj.id } }));
    if (update_err || !update_data[0])
      return respond(res, http_server_error);

    respond(res, http_ok);
  },

};
