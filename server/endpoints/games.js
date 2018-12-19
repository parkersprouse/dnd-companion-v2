const crypto = require('crypto');
const _ = require('lodash');

const { http_ok, http_bad_request, http_server_error } = require('../config/constants');
const mailer = require('../config/mailer');
const { call, isEmail, respond } = require('../lib');
const Character = require('../models/character');
const CharacterGameAssociation = require('../models/char_game_association');
const Game = require('../models/game');
const User = require('../models/user');

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

  async getCharacters(req, res) {
    const game_id = req.params.id;

    const [err, data] = await call(CharacterGameAssociation.findAll({
      where: { game_id },
      include: [{ model: Character, required: true }]
    }));
    if (err)
      return respond(res, http_server_error, "There was a problem finding the game's characters");
    
    const games = data.map((game) => game.get({ plain: true }));
    respond(res, http_ok, null, games);
  },

  async getPlayers(req, res) {
    const game_id = req.params.id;

    const [err, data] = await call(CharacterGameAssociation.findAll({
      where: { game_id },
      attributes: ['user_id'],
      include: [{ model: User, required: true, attributes: ['id', 'email', 'username', 'name'] }]
    }));
    if (err)
      return respond(res, http_server_error, "There was a problem finding the game's players");

    const players = _.uniqBy(data.map((game) => game.get({ plain: true })), 'user_id');
    respond(res, http_ok, null, players);
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
    const [err, data] = await call(Game.create(game_data));
    if (err)
      return respond(res, http_server_error, 'There was a problem when creating your game');

    respond(res, http_ok, null, data.id);
  },

  async join(req, res) {
    const { code, character_id } = req.body;

    if (!code || !character_id)
      return respond(res, http_bad_request, 'Please make sure all required fields are filled out');

    // Make sure a game with the given code exists
    const [find_game_err, find_game_data] = await call(Game.findOne({ where: { code } }));
    if (find_game_err)
      return respond(res, http_server_error, 'There was a problem joining the game');
    if (!find_game_data)
      return respond(res, http_bad_request, 'No game found with the provided code');

    // Make sure the character with the provided ID exists and belongs to the requesting user
    const [find_char_err, find_char_data] = await call(Character.findOne({ where: { id: character_id } }));
    if (find_char_err || !find_char_data || find_char_data.user_id !== req.user_obj.id)
      return respond(res, http_server_error, 'There was a problem joining the game');

    // Make sure the character isn't part of any other games
    const [existing_game_err, existing_game_data] = await call(CharacterGameAssociation.findOne({ where: { character_id } }));
    if (existing_game_err)
      return respond(res, http_server_error, 'There was a problem joining the game');
    if (existing_game_data)
      return respond(res, http_bad_request, 'This character is already a part of another game');

    const [create_err, create_data] = await call(CharacterGameAssociation.create({
      character_id, game_id: find_game_data.id, user_id: req.user_obj.id
    }));
    if (create_err)
      return respond(res, http_server_error, 'There was a problem joining the game');

    respond(res, http_ok, null, create_data.id);
  },

  async invite(req, res) {
    const { code, email } = req.body;

    if (!email || !isEmail(email))
      return respond(res, http_bad_request, 'Please provide an e-mail address');
    if (!code)
      return respond(res, http_bad_request, 'No game code provided');

    const [game_err, game_data] = await call(Game.findOne({ where: { code } }));
    if (game_err || !game_data)
      return respond(res, http_server_error, 'There was a problem sending your game invite');

    mailer({
      subject: 'D&D Companion App Game Invite',
      html_content: `You've been sent an invite from <b>${req.user_obj.username}</b> to join the game "${game_data.name}" on the D&D Companion App.<br /><br />\
                     If you'd like to join the game, visit <a href='https://dnd.parkersprouse.me/games/join?code=${code}'>https://dnd.parkersprouse.me/games/join?code=${code}</a>`,
      raw_content: `You've been sent an invite from ${req.user_obj.username} to join the game "${game_data.name}" on the D&D Companion App. \
                    If you'd like to join the game, visit https://dnd.parkersprouse.me/games/join?code=${code}`,
      addresses: [email]
    }, (success) => {
      if (!success)
        return respond(res, http_bad_request, 'There was an unexpected error when attempting to send the invite');
    });

    respond(res, http_ok);
  },

  async update(req, res) {
    const { id, name } = req.body;

    if (name !== undefined && !name)
      return respond(res, http_bad_request, 'Please make sure your game has a name');

    // Make sure the game with the provided ID exists and belongs to the requesting user
    const [find_err, find_data] = await call(Game.findOne({ where: { id } }));
    if (find_err)
      return respond(res, http_server_error, 'There was a problem updating your game');
    if (!find_data || find_data.user_id !== req.user_obj.id)
      return respond(res, http_bad_request, 'No game found with the provided ID');

    const [update_err, update_data] = await call(Game.update(req.body, { where: { id } }));
    if (update_err)
      return respond(res, http_server_error, 'There was a problem updating your game');
    if (!update_data[0])
      return respond(res, http_bad_request, 'No game updated, check provided ID');

    respond(res, http_ok);
  },

  async delete(req, res) {
    const game_id = req.params.id;
    const user_id = req.user_obj.id;

    // Make sure the game with the provided ID exists and belongs to the requesting user
    const [find_err, find_data] = await call(Game.findOne({ where: { id: game_id } }));
    if (find_err || !find_data || find_data.user_id !== user_id)
      return respond(res, http_server_error, 'There was a problem deleting your game');

    // Returns 0 or 1 to determine if row was deleted
    const [delete_err, delete_data] = await call(Game.destroy({ where: { id: game_id } }));
    if (delete_err || !delete_data)
      return respond(res, http_server_error, 'There was a problem deleting your game');

    respond(res, http_ok);
  },

};
