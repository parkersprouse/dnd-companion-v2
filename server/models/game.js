const { db, Sequelize } = require('../config/db');
const User = require('./user');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  code:         { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:         { type: Sequelize.TEXT, allowNull: false },
  description:  { type: Sequelize.TEXT }
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const Game = db.define('games', attributes, table_config);
Game.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade', hooks: true }); // user_id, the user who created the game

module.exports = Game;
