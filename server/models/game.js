const { db, Sequelize } = require('../config/db');
const User = require('./user');

const attributes = {
  code: {
    allowNull: false,
    type: Sequelize.TEXT,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  freezeTableName: true,
  timestamps: true,
  underscored: true,
};

const Game = db.define('games', attributes, table_config);
Game.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'user_id' }, // the user who created the game
  hooks: true,
  onDelete: 'cascade',
});

module.exports = Game;
