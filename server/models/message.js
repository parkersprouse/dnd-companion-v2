const { db, Sequelize } = require('../config/db');
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
  body: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  type: {
    allowNull: false,
    type: Sequelize.ENUM,
    values: ['private', 'group', 'table'],
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

const Message = db.define('messages', attributes, table_config);
Message.belongsTo(Game, {
  foreignKey: { allowNull: false, name: 'game_id' }, // the game this message was sent in
  hooks: true,
  onDelete: 'cascade',
});
Message.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'user_id' }, // the user who sent the message
  hooks: true,
  onDelete: 'cascade',
});

module.exports = Message;
