const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { call, respond } = require('../lib');
const {
  db_err_duplicate,
  http_ok,
  http_bad_request,
  http_not_found,
  http_server_error,
} = require('../config/constants');
const { Op } = require('../config/db');
const mailer = require('../lib/mailer');
const User = require('../models/user');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(User.findAll({
      attributes: ['id', 'email', 'username', 'name'],
    }));
    if (err) return respond(res, http_server_error, 'Failed to get all users');

    const users = data.map((user) => user.get({ plain: true }));
    respond(res, http_ok, null, users);
  },

  async getByID(req, res) {
    const [err, data] = await call(User.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'email', 'username', 'name'],
    }));
    if (err) return respond(res, http_server_error, 'Failed to get user');
    if (!data) return respond(res, http_not_found, 'No user found');

    respond(res, http_ok, null, data);
  },

  getMe(req, res) {
    req.params.id = req.user_obj.id;
    return module.exports.getByID(req, res);
  },

  async sendRecoveryEmail(req, res) {
    const { email } = req.body;

    const [find_err, find_data] = await call(User.findOne({
      where: { email: { [Op.iLike]: email } },
    }));
    if (find_err) {
      return respond(res, http_bad_request,
        'There was an unexpected error when attempting to send the e-mail');
    }
    if (!find_data) {
      return respond(res, http_ok);
    }

    const pw_reset_key = crypto.randomBytes(12).toString('hex');
    const [update_err, update_data] = await call(User.update({ pw_reset_key }, {
      where: { email: { [Op.iLike]: email } },
    }));
    if (update_err || !update_data[0]) {
      return respond(res, http_bad_request,
        'There was an unexpected error when attempting to send the e-mail');
    }

    const { username } = find_data.get({ plain: true });
    mailer({
      subject: 'D&D Companion App Account Recovery',
      html_content: `A request was made to recover the account information associated with this \
                     e-mail address.<br /><br />\
                     Your username is: <b>${username}</b><br /><br />\
                     To reset your password, visit \
                     <a href='https://dnd.parkersprouse.me/account_recovery?key=${pw_reset_key}'>\
                     https://dnd.parkersprouse.me/account_recovery?key=${pw_reset_key}</a>`,
      raw_content: `A request was made to recover the account information associated with this \
                    e-mail address. Your username is: ${username}. To reset your password, \
                    please visit https://dnd.parkersprouse.me/account_recovery?key=${pw_reset_key}`,
      addresses: [email],
    }, (success) => {
      if (!success) {
        return respond(res, http_bad_request,
          'There was an unexpected error when attempting to send the e-mail');
      }
    });

    respond(res, http_ok);
  },

  async update(req, res) {
    const { id } = req.user_obj.id;

    const [match_err, match_data] = await call(User.findOne({ where: { id } }));
    if (match_err || !match_data) {
      return respond(res, http_server_error,
        'There was an unknown problem when updating your account');
    }

    const match = bcrypt.compareSync(req.body.current_password, match_data.pw_hash);
    if (!match) return respond(res, http_bad_request, 'Current password incorrect');

    const [update_err] = await call(User.update(req.body, { where: { id } }));
    if (update_err) {
      let message = 'There was an unknown problem when updating your account';
      if (update_err.name === db_err_duplicate) {
        const error = update_err.errors[0];
        if (error.path.includes('username')) {
          message = 'An account with that username already exists';
        } else if (error.path.includes('email')) {
          message = 'An account with that e-mail address already exists';
        }
      }
      return respond(res, http_bad_request, message);
    }

    respond(res, http_ok);
  },

  async resetPassword(req, res) {
    const pw_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
    const [err, data] = await call(User.update({ pw_hash, pw_reset_key: null }, {
      where: { pw_reset_key: req.body.pw_reset_key },
    }));
    if (err || !data[0]) {
      return respond(res, http_server_error,
        'Failed to update your password. Check the provided reset key.');
    }

    respond(res, http_ok);
  },

  async updatePassword(req, res) {
    const { id } = req.user_obj;

    const [match_err, match_data] = await call(User.findOne({ where: { id } }));
    if (match_err || !match_data) {
      return respond(res, http_server_error,
        'There was an unknown problem when updating your password');
    }

    const match = bcrypt.compareSync(req.body.current_password, match_data.pw_hash);
    if (!match) return respond(res, http_bad_request, 'Current password incorrect');

    const pw_hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
    const [update_err, update_data] = await call(User.update({ pw_hash }, { where: { id } }));
    if (update_err || !update_data[0]) {
      return respond(res, http_server_error,
        'There was an unknown problem when updating your password');
    }

    respond(res, http_ok);
  },

};
