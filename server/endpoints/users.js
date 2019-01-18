const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { call, isEmail, respond } = require('../lib');
const { db_err_duplicate, http_ok, http_bad_request, http_no_content, http_server_error } = require('../config/constants');
const mailer = require('../config/mailer');
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

    const [err, data] = await call(User.findOne({ where: { id }, attributes: ['id', 'email', 'username', 'name'] }));
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

  async sendRecoveryEmail(req, res) {
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
      subject: 'D&D Companion App Account Recovery',
      html_content: `A request was made to recover the account information associated with this e-mail address.<br /><br />\
                     Your username is: <b>${user.username}</b>.<br /><br />\
                     To reset your password, visit <a href='https://dnd.parkersprouse.me/account_recovery?key=${key}'>https://dnd.parkersprouse.me/account_recovery?key=${key}</a>`,
      raw_content: `A request was made to recover the account information associated with this e-mail address. Your username is: ${user.username}. To reset your password, please visit https://dnd.parkersprouse.me/account_recovery?key=${key}`,
      addresses: [req.body.email]
    }, (success) => {
      if (!success)
        return respond(res, http_bad_request, 'There was an unexpected error when attempting to send the e-mail');
    });

    respond(res, http_ok);
  },

  async resetPassword(req, res) {
    const { pw_reset_key, pass_confirm, pass_new } = req.body;

    if (!pw_reset_key)
      return respond(res, http_bad_request, 'No reset key provided');
    if (!pass_new || pass_new.length < 8)
      return respond(res, http_bad_request, 'Password must be at least 8 characters');
    if (pass_new !== pass_confirm)
      return respond(res, http_bad_request, 'Passwords did not match');

    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(pass_new, salt);
    const [err, data] = await call(User.update({ pw_hash, pw_reset_key: null }, { where: { pw_reset_key } }));
    if (err || !data[0])
      return respond(res, http_server_error, 'Failed to update your password. Check the provided reset key.');

    respond(res, http_ok);
  },

  async update(req, res) {
    if (!req.body.email || !isEmail(req.body.email))
      return respond(res, http_bad_request, 'Your e-mail must be valid');
    if (!req.body.username)
      return respond(res, http_bad_request, 'You must have a username');

    const [match_err, match_data] = await call(User.findOne({ where: { id: req.user_obj.id } }));
    if (match_err || !match_data)
      return respond(res, http_server_error, 'There was an unknown problem when updating your account');

    const match = bcrypt.compareSync(req.body.current_password, match_data.pw_hash);
    if (!match)
      return respond(res, http_bad_request, 'Current password incorrect');

    const [update_err] = await call(User.update(req.body, { where: { id: req.user_obj.id } }));
    if (update_err) {
      let message = 'There was an unknown problem when updating your account';
      if (update_err.name === db_err_duplicate) {
        const error = update_err.errors[0];
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
    const { current_password, new_password_confirm, new_password } = req.body;

    if (!new_password || new_password.length < 8)
      return respond(res, http_bad_request, 'Password must be at least 8 characters');
    if (new_password !== new_password_confirm)
      return respond(res, http_bad_request, 'Passwords did not match');

    const [match_err, match_data] = await call(User.findOne({ where: { id: req.user_obj.id } }));
    if (match_err || !match_data)
      return respond(res, http_server_error);

    const match = bcrypt.compareSync(current_password, match_data.pw_hash);
    if (!match)
      return respond(res, http_bad_request, 'Current password incorrect');

    const salt = bcrypt.genSaltSync();
    const pw_hash = bcrypt.hashSync(new_password, salt);
    const [update_err, update_data] = await call(User.update({ pw_hash }, { where: { id: req.user_obj.id } }));
    if (update_err || !update_data[0])
      return respond(res, http_server_error);

    respond(res, http_ok);
  },

};
