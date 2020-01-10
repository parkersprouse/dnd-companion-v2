const { db, Sequelize } = require('../config/db');
const Message = require('./message');
const Game = require('./game');
const User = require('./user');

const attributes = {
  id: {
    type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true,
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps: true,
  freezeTableName: true,
  underscored: true,
};

const MessageReceiverAssociation = db.define('message_receiver_association', attributes, table_config);
MessageReceiverAssociation.belongsTo(Message, { foreignKey: { allowNull: false, name: 'message_id' }, onDelete: 'cascade', hooks: true }); // message_id, the message that the person received
MessageReceiverAssociation.belongsTo(Game, { foreignKey: { allowNull: false, name: 'game_id' }, onDelete: 'cascade', hooks: true }); // game_id, the game the message is in
MessageReceiverAssociation.belongsTo(User, { foreignKey: { allowNull: false, name: 'user_id' }, onDelete: 'cascade', hooks: true }); // user_id, the user who received the message

module.exports = MessageReceiverAssociation;
