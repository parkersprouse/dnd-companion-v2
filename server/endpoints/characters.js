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
    const [err, data] = await call(Character.findAll({ where: { owner_id } }));
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

  async create(req, res) {
    if (!req.body.name)
      return respond(res, http_bad_request, 'Please make sure your character has a name');

    const char_data = { owner_id: req.user_obj.id, ...req.body };
    const [err, data] = await call(Character.create(char_data));
    if (err)
      return respond(res, http_server_error, 'There was a problem when creating your character');

    respond(res, http_ok, null, data.id);
  },

  async update(req, res) {
    const { id, name } = req.body;

    if (name !== undefined && !name)
      return respond(res, http_bad_request, 'Please make sure your character has a name');

    const [err, data] = await call(Character.update(req.body, { where: { id } }));
    if (err)
      return respond(res, http_server_error, 'There was a problem when updating your character');
    if (!data[0])
      return respond(res, http_bad_request, 'No character updated, check provided ID');

    respond(res, http_ok);
  },

  async delete(req, res) {
    const char_id = req.params.id;
    const user_id = req.user_obj.id;

    const [find_err, find_data] = await call(Character.findOne({ where: { id: char_id } }));
    if (find_err || !find_data || find_data.owner_id !== user_id)
      return respond(res, http_server_error, 'There was a problem deleting your character');

    // Returns 0 or 1 to determine if row was deleted
    const [delete_err, delete_data] = await call(Character.destroy({ where: { id: char_id } }));
    if (delete_err || !delete_data)
      return respond(res, http_server_error, 'There was a problem deleting your character');

    respond(res, http_ok);
  },

};
