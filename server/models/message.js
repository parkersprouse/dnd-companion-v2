const { db, Sequelize } = require('../config/db');
const Game = require('./game');
const User = require('./user');

const attributes = {
  id:   { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  body: { type: Sequelize.TEXT, allowNull: false },
  type: { type: Sequelize.ENUM, allowNull: false, values: ['private', 'group', 'table'] }
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps:      true,
  freezeTableName: true,
  underscored:     true
};

const Message = db.define('messages', attributes, table_config);
Message.belongsTo(Game, { foreignKey: { allowNull: false, name: 'game_id' }, onDelete: 'cascade', hooks: true }); // game_id, the game this message was sent in
Message.belongsTo(User, { foreignKey: { allowNull: false, name: 'user_id' }, onDelete: 'cascade', hooks: true }); // user_id, the user who sent the message

module.exports = Message;
