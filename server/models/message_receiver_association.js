const { db, Sequelize } = require('../config/db');
const Message = require('./message');
const Game = require('./game');
const User = require('./user');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true,
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

const MessageReceiverAssociation = db.define('message_receiver_association', attributes,
  table_config);
MessageReceiverAssociation.belongsTo(Message, {
  foreignKey: { allowNull: false, name: 'message_id' }, // the message that the person received
  hooks: true,
  onDelete: 'cascade',
});
MessageReceiverAssociation.belongsTo(Game, {
  foreignKey: { allowNull: false, name: 'game_id' }, // the game the message is in
  hooks: true,
  onDelete: 'cascade',
});
MessageReceiverAssociation.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'user_id' }, // the user who received the message
  hooks: true,
  onDelete: 'cascade',
});

module.exports = MessageReceiverAssociation;
