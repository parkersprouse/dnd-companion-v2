const { db, Sequelize } = require('../config/db');
const Game = require('./game');
const User = require('./user');

const attributes = {
  id:           { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, unique: true, primaryKey: true },
  message:      { type: Sequelize.TEXT, allowNull: false },
  type:         { type: Sequelize.ENUM, allowNull: false, values: ['private', 'group', 'table'] },
  receiver_ids: { type: Sequelize.ARRAY(Sequelize.INTEGER), allowNull: false },
  game_id:      {
                  type: Sequelize.INTEGER, allowNull: false,
                  references: {
                    model: Game,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                  }
                },
  sender_id:    {
                  type: Sequelize.INTEGER, allowNull: false,
                  references: {
                    model: User,
                    key: 'id',
                    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
                  }
                }
};

const table_config = {
  timestamps:      true,
  freezeTableName: true,
  underscored:     true
};

const Message = db.define('messages', attributes, table_config);

module.exports = Message;
