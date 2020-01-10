const { db, Sequelize } = require('../config/db');
const Character = require('./character');
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

const CharacterGameAssociation = db.define('character_game_assocations', attributes, table_config);
CharacterGameAssociation.belongsTo(Character, { foreignKey: { allowNull: false, name: 'character_id' }, onDelete: 'cascade', hooks: true }); // character_id, the character who is in the game
CharacterGameAssociation.belongsTo(Game, { foreignKey: { allowNull: false, name: 'game_id' }, onDelete: 'cascade', hooks: true }); // game_id, the game the character is in
CharacterGameAssociation.belongsTo(User, { foreignKey: { allowNull: false, name: 'user_id' }, onDelete: 'cascade', hooks: true }); // user_id, the user who owns the character in this game

module.exports = CharacterGameAssociation;
