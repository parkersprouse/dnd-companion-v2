const Sequelize = require('sequelize');
const config = require('./index');

const db = new Sequelize({
  database: config.db.database,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: config.db.port,
  ssl: config.db.ssl,
  dialect: 'postgres',
  dialectOptions: {
    ssl: config.db.ssl
  }
});

module.exports = {
  db,
  Sequelize
};
