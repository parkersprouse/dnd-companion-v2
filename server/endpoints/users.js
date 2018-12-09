const { call, respond } = require('./lib');
const config = require('../config');
const User = require('../models/user');

module.exports = {
  
  async getByID(req, res) {
    const { id } = req.params;

    const [err, data] = await call(User.findOne({ where: { id }, attributes: ['email', 'username', 'name'] }));
    if (err)
      return respond(res, http_server_error, 'Failed to get user');
    if (!data)
      return respond(res, http_no_content, 'No user found');

    respond(res, http_ok, null, data);
  },

};
