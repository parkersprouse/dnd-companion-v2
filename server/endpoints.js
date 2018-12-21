const express = require('express');
const router = express.Router();

const { verifyToken } = require('./lib');

//------------------------------------------------------------------------
// Authentication / Misc.
const auth = require('./endpoints/auth');
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/logout', auth.logout);

//------------------------------------------------------------------------
// Characters
const characters = require('./endpoints/characters');
router.get('/characters', verifyToken, characters.getAll);
router.get('/characters/me', verifyToken, characters.getMe);
router.get('/characters/:id', verifyToken, characters.getByID);
router.post('/characters', verifyToken, characters.create);
router.patch('/characters', verifyToken, characters.update);
router.delete('/characters/:id', verifyToken, characters.delete);

//------------------------------------------------------------------------
// D&D Data
const dnd_data = require('./endpoints/dnd_data');
router.get('/dnd/:data_type', dnd_data.getAll);
router.post('/dnd/:data_type', dnd_data.getSpecific);

//------------------------------------------------------------------------
// Games
const games = require('./endpoints/games');
router.get('/games', verifyToken, games.getAll);
router.get('/games/own', verifyToken, games.getOwned); // Games you created
router.get('/games/play', verifyToken, games.getPlayed); // Games you play in
router.get('/games/characters/:id', verifyToken, games.getCharacters);
router.get('/games/players/:id', verifyToken, games.getPlayers);
router.get('/games/:id', verifyToken, games.getByID);
router.post('/games', verifyToken, games.create);
router.post('/games/join', verifyToken, games.join);
router.post('/games/invite', verifyToken, games.invite);
router.patch('/games', verifyToken, games.update);
router.delete('/games/:id', verifyToken, games.delete);

//------------------------------------------------------------------------
// Messages
const messages = require('./endpoints/messages');
router.get('/messages', verifyToken, messages.getAll);
router.get('/messages/:game_id', verifyToken, messages.getForGame);
router.get('/messages/:game_id/:user_id', verifyToken, messages.getMineForGame);
router.post('/messages', verifyToken, messages.create);
router.patch('/messages', verifyToken, messages.update);
router.delete('/messages/:id', verifyToken, messages.delete);

//------------------------------------------------------------------------
// Users
const users = require('./endpoints/users');
router.get('/users', verifyToken, users.getAll);
router.get('/users/me', verifyToken, users.getMe);
router.get('/users/:id', verifyToken, users.getByID);
router.post('/users/send_recovery_email', users.sendRecoveryEmail);
router.patch('/users', verifyToken, users.update);
router.patch('/users/update_password', verifyToken, users.updatePassword);
router.patch('/users/reset_password', users.resetPassword);

module.exports = router;
