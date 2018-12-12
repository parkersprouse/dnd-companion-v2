const Sequelize = require('sequelize');
const config = require('./index');

const db = new Sequelize(config.db, {
  dialectOptions: {
    ssl: true
  }
});

module.exports = {
  db,
  Sequelize
};
