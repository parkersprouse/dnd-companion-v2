const { call, respond } = require('../lib');
const {
  http_ok,
  http_bad_request,
  http_no_content,
  http_server_error,
} = require('../config/constants');
const Character = require('../models/character');
const CharacterGameAssociation = require('../models/char_game_association');
const Game = require('../models/game');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(Character.findAll());
    if (err) return respond(res, http_server_error, 'Failed to get all characters');

    const chars = data.map((char) => char.get({ plain: true }));
    respond(res, http_ok, null, chars);
  },

  async getMe(req, res) {
    const user_id = req.user_obj.id;
    const [err, data] = await call(Character.findAll({ where: { user_id } }));
    if (err) return respond(res, http_server_error, 'Failed to get your characters');

    const chars = [];
    for (let i = 0; i < data.length; i += 1) {
      const [, game_data] = await call(CharacterGameAssociation.findOne({
        where: { character_id: data[i].id },
        include: [{ model: Game, required: true }],
      }));
      const char = { data: data[i].get({ plain: true }) };
      if (game_data) char.game = game_data.game;
      chars.push(char);
    }

    respond(res, http_ok, null, chars);
  },

  async getByID(req, res) {
    const [char_err, char_data] = await call(Character.findOne({
      where: { id: req.params.id },
    }));
    if (char_err) {
      return respond(res, http_server_error, 'Failed to get character');
    }
    if (!char_data) {
      return respond(res, http_no_content, 'No character found');
    }

    const [, game_data] = await call(CharacterGameAssociation.findOne({
      where: { character_id: char_data.id },
      include: [{ model: Game, required: true }],
    }));

    respond(res, http_ok, null, {
      char: char_data,
      game: game_data ? game_data.game : null,
    });
  },

  async create(req, res) {
    const char_data = { user_id: req.user_obj.id, ...req.body };
    const [err, data] = await call(Character.create(char_data));
    if (err) {
      return respond(res, http_server_error, 'There was a problem when creating your character');
    }

    respond(res, http_ok, null, data.id);
  },

  async update(req, res) {
    const { id } = req.params;

    // Make sure the character with the provided ID exists and belongs to the
    // requesting user
    const [find_err, find_data] = await call(Character.findOne({
      where: { id },
    }));
    if (find_err) {
      return respond(res, http_server_error, 'There was a problem updating your character');
    }
    if (!find_data || find_data.user_id !== req.user_obj.id) {
      return respond(res, http_bad_request, 'No character found with the provided ID');
    }

    const [update_err, update_data] = await call(Character.update(req.body, {
      where: { id },
    }));
    if (update_err) {
      return respond(res, http_server_error, 'There was a problem when updating your character');
    }
    if (!update_data[0]) {
      return respond(res, http_bad_request, 'No character updated, check provided ID');
    }

    respond(res, http_ok);
  },

  async delete(req, res) {
    const { id } = req.params;

    // Make sure the character with the provided ID exists and belongs to the
    // requesting user
    const [find_err, find_data] = await call(Character.findOne({
      where: { id },
    }));
    if (find_err || !find_data || find_data.user_id !== req.user_obj.id) {
      return respond(res, http_server_error,
        'There was a problem deleting your character');
    }

    // Returns 0 or 1 to determine if row was deleted
    const [delete_err, delete_data] = await call(Character.destroy({
      where: { id },
    }));
    if (delete_err || !delete_data) {
      return respond(res, http_server_error,
        'There was a problem deleting your character');
    }

    respond(res, http_ok);
  },

};
