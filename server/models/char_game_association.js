const { db, Sequelize } = require('../config/db');
const Character = require('./character');
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

const CharacterGameAssociation = db.define('character_game_assocations', attributes, table_config);
CharacterGameAssociation.belongsTo(Character, { onDelete: 'cascade', hooks: true }); // character_id, the character who is in the game
CharacterGameAssociation.belongsTo(Game, { onDelete: 'cascade', hooks: true }); // game_id, the game the character is in
CharacterGameAssociation.belongsTo(User, { onDelete: 'cascade', hooks: true }); // user_id, the user who owns the character in this game

module.exports = CharacterGameAssociation;
