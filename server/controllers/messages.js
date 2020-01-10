const { call, respond } = require('../lib');
const { http_ok, http_bad_request, http_server_error } = require('../config/constants');
const { db } = require('../config/db');
const Game = require('../models/game');
const Message = require('../models/message');
const MessageReceiverAssociation = require('../models/message_receiver_association');
const User = require('../models/user');

module.exports = {

  async getAll(req, res) {
    const [err, data] = await call(Message.findAll({
      include: [
        { model: Game, required: true },
        { model: User, required: true, attributes: ['id', 'email', 'username', 'name'] },
      ],
    }));
    if (err) return respond(res, http_server_error, 'Failed to get all messages');

    const messages = data.map((msg) => msg.get({ plain: true }));
    respond(res, http_ok, null, messages);
  },

  async getForGame(req, res) {
    const [err, data] = await call(MessageReceiverAssociation.findAll({
      where: { game_id: req.params.game_id },
      include: [
        {
          model: Message,
          required: true,
          include: [
            { model: Game, required: true },
            { model: User, required: true, attributes: ['id', 'email', 'username', 'name'] },
          ],
        },
      ],
    }));
    if (err) return respond(res, http_server_error, 'Failed to get messages');

    const messages = data.map((msg) => msg.get({ plain: true }));
    respond(res, http_ok, null, messages);
  },

  async getMineForGame(req, res) {
    const [err, data] = await call(MessageReceiverAssociation.findAll({
      where: { game_id: req.params.game_id },
      include: [
        {
          model: Message,
          required: true,
          where: { user_id: req.params.user_id },
          include: [
            { model: Game, required: true },
            { model: User, required: true, attributes: ['id', 'email', 'username', 'name'] },
          ],
        },
      ],
    }));
    if (err) return respond(res, http_server_error, 'Failed to get messages');

    const messages = data.map((msg) => msg.get({ plain: true }));
    respond(res, http_ok, null, messages);
  },

  async create(req, res) {
    const msg_data = { user_id: req.user_obj.id, ...req.body };
    let new_msg = null;
    const [err] = await call(db.transaction((t) => Message.create(msg_data, { transaction: t })
      .then((data) => {
        new_msg = data.dataValues;
        const associations = [];
        for (let i = 0; i < req.body.receiver_ids.length; i++) {
          associations.push(
            MessageReceiverAssociation.create(
              {
                game_id: req.body.game_id,
                message_id: data.id,
                user_id: req.body.receiver_ids[i],
              },
              { transaction: t },
            ),
          );
        }
        return Promise.all(associations);
      })));
    if (err) return respond(res, http_server_error, 'There was a problem sending your message');

    respond(res, http_ok, null, new_msg);
  },

  async update(req, res) {
    const { id } = req.body;

    // Make sure the message with the provided ID exists and belongs to the requesting user
    const [find_err, find_data] = await call(Message.findOne({
      where: { id, user_id: req.user_obj.id },
    }));
    if (find_err) {
      return respond(res, http_server_error, 'There was a problem updating your message');
    }
    if (!find_data) {
      return respond(res, http_bad_request, 'No message found with the provided ID');
    }

    const [update_err, update_data] = await call(Message.update(req.body, { where: { id } }));
    if (update_err) {
      return respond(res, http_server_error, 'There was a problem when updating your message');
    }
    if (!update_data[0]) {
      return respond(res, http_bad_request, 'No message updated, check provided ID');
    }

    respond(res, http_ok);
  },

  async delete(req, res) {
    const { id } = req.params;

    // Make sure the message with the provided ID exists and belongs to the requesting user
    const [find_err, find_data] = await call(Message.findOne({
      where: { id, user_id: req.user_obj.id },
    }));
    if (find_err || !find_data) {
      return respond(res, http_server_error, 'There was a problem deleting your message');
    }

    // Returns 0 or 1 to determine if row was deleted
    const [delete_err, delete_data] = await call(Message.destroy({ where: { id } }));
    if (delete_err || !delete_data) {
      return respond(res, http_server_error, 'There was a problem deleting your message');
    }

    respond(res, http_ok);
  },

};
