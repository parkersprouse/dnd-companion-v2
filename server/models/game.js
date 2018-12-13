const { db, Sequelize } = require('../config/db');
const Message = require('./message');
const User = require('./user');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  code:         { type: Sequelize.TEXT, allowNull: false, unique: true },
  name:         { type: Sequelize.TEXT, allowNull: false },
  description:  { type: Sequelize.TEXT },
  char_ids:     { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false },
  user_ids:     { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false },
  owner_id:     {
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

const Game = db.define('games', attributes, table_config);
Game.hasMany(Message, { onDelete: 'cascade', hooks: true });

module.exports = Game;
