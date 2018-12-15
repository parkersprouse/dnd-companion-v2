const { call, respond } = require('../lib');
const { http_ok, http_bad_request, http_no_content, http_server_error } = require('../config/constants');
const Character = require('../models/character');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(Character.findAll());
    if (err)
      return respond(res, http_server_error, 'Failed to get all characters');

    const chars = data.map((char) => char.get({ plain: true }));
    respond(res, http_ok, null, chars);
  },

  async getMine(req, res) {
    const owner_id = req.user_obj.id;
    const [err, data] = await call(Character.findAll({ where: owner_id }));
    if (err)
      return respond(res, http_server_error, 'Failed to get your characters');

    const chars = data.map((char) => char.get({ plain: true }));
    respond(res, http_ok, null, chars);
  },

  async getByID(req, res) {
    const { id } = req.params;

    const [err, data] = await call(Character.findOne({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get character');
    if (!data)
      return respond(res, http_no_content, 'No character found');

    respond(res, http_ok, null, data);
  },

};
