const { db, Sequelize } = require('../config/db');
const Character = require('./character');
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

const CharacterGameAssociation = db.define('character_game_assocations', attributes, table_config);
CharacterGameAssociation.belongsTo(Character, {
  foreignKey: { allowNull: false, name: 'character_id' }, // the character who is in the game
  hooks: true,
  onDelete: 'cascade',
});
CharacterGameAssociation.belongsTo(Game, {
  foreignKey: { allowNull: false, name: 'game_id' }, // the game the character is in
  hooks: true,
  onDelete: 'cascade',
});
CharacterGameAssociation.belongsTo(User, {
  foreignKey: { allowNull: false, name: 'user_id' }, // the user who owns the character in this game
  hooks: true,
  onDelete: 'cascade',
});

module.exports = CharacterGameAssociation;
