const { db, Sequelize } = require('../config/db');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    unique: true,
  },
  email: {
    allowNull: false,
    type: Sequelize.TEXT,
    unique: true,
  },
  username: {
    allowNull: false,
    type: Sequelize.TEXT,
    unique: true,
  },
  name: {
    type: Sequelize.TEXT,
  },
  pw_hash: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  pw_reset_key: {
    type: Sequelize.TEXT,
  },
};

// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration
const table_config = {
  freezeTableName: true,
  indexes: [{
    fields: [db.fn('LOWER', db.col('email'))],
    method: 'BTREE',
    name: 'users_lowercase_email',
    unique: true,
  }],
  timestamps: true,
  underscored: true,
};

const User = db.define('users', attributes, table_config);

module.exports = User;
