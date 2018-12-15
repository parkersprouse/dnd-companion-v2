const { db, Sequelize } = require('../config/db');
const Character = require('./character');
const Game = require('./game');
const User = require('./user');

const attributes = {
  char_id:   { // ID of the character in the game
              type: Sequelize.INTEGER, allowNull: false,
               references: {
                 model: Character,
                 key: 'id',
                 deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
               }
             },
  game_id:   { // ID of the game the character is in
               type: Sequelize.INTEGER, allowNull: false,
               references: {
                 model: Game,
                 key: 'id',
                 deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
               }
             },
  player_id: { // ID of the player who owns the character
              type: Sequelize.INTEGER, allowNull: false,
              references: {
                model: User,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
              }
            }
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  timestamps:      false,
  freezeTableName: true,
  underscored:     true
};

const CharacterGameAssociation = db.define('character_game_assocations', attributes, table_config);

module.exports = CharacterGameAssociation;
