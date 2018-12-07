const Character = require('../models/character');
const Game = require('../models/game');
const Message = require('../models/message');
const User = require('../models/user');

(async function setup() {
  // DROP ALL TABLES
  await Character.drop();
  await Message.drop();
  await Game.drop();
  await User.drop();

  // CREATE ALL TABLES
  await User.sync();
  await Character.sync();
  await Game.sync();
  await Message.sync();

  // Clean up after syncing
  process.exit();
})();
