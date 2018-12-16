const crypto = require('crypto');

const { call, respond } = require('../lib');
const { http_ok, http_bad_request, http_server_error } = require('../config/constants');
const Game = require('../models/game');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(Game.findAll());
    if (err)
      return respond(res, http_server_error, 'Failed to get all games');

    const games = data.map((game) => game.get({ plain: true }));
    respond(res, http_ok, null, games);
  },

  async getMe(req, res) {
    const user_id = req.user_obj.id;

    const [err, data] = await call(Game.findAll({ where: { user_id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get your games');

    const games = data.map((game) => game.get({ plain: true }));
    respond(res, http_ok, null, games);
  },

  async getByID(req, res) {
    const { id } = req.params;

    const [err, data] = await call(Game.findOne({ where: { id } }));
    if (err)
      return respond(res, http_server_error, 'Failed to get game');
    if (!data)
      return respond(res, http_no_content, 'No game found');

    respond(res, http_ok, null, data);
  },

  async create(req, res) {
    if (!req.body.name)
      return respond(res, http_bad_request, 'Please make sure your game has a name');

    const game_data = {
      code: crypto.randomBytes(12).toString('hex'),
      user_id: req.user_obj.id,
      ...req.body
    };
    const [err, data] = await call(Character.create(game_data));
    if (err)
      return respond(res, http_server_error, 'There was a problem when creating your game');

    respond(res, http_ok, null, data.id);
  },

  async join(req, res) {

  },

  async invite(req, res) {

  },

  async update(req, res) {

  },

  async delete(req, res) {

  },

};
