const { db, Sequelize } = require('../config/db');
const Message = require('./message');
const Game = require('./game');
const User = require('./user');

const attributes = {
  id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true }
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const MessageReceiverAssociation = db.define('message_receiver_association', attributes, table_config);
MessageReceiverAssociation.belongsTo(Message, { onDelete: 'cascade', hooks: true }); // message_id, the message that the person received
MessageReceiverAssociation.belongsTo(Game, { onDelete: 'cascade', hooks: true }); // game_id, the game the message is in
MessageReceiverAssociation.belongsTo(User, { onDelete: 'cascade', hooks: true }); // user_id, the user who received the message

module.exports = MessageReceiverAssociation;
