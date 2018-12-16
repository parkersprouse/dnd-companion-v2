const Character = require('../models/character');
const CharacterGameAssociation = require('../models/char_game_association');
const Game = require('../models/game');
const Message = require('../models/message');
const MessageReceiverAssociation = require('../models/message_receiver_association');
const User = require('../models/user');

(async function setup() {
  // DROP ALL TABLES
  await MessageReceiverAssociation.drop();
  await CharacterGameAssociation.drop();
  await Message.drop();
  await Game.drop();
  await Character.drop();
  await User.drop();

  // CREATE ALL TABLES
  await User.sync();
  await Character.sync();
  await Game.sync();
  await Message.sync();
  await CharacterGameAssociation.sync();
  await MessageReceiverAssociation.sync();

  // Clean up after syncing
  process.exit();
})();
