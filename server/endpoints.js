const express = require('express');
const router = express.Router();

const { verifyToken, sendRecoveryEmail } = require('./lib');

//------------------------------------------------------------------------
// Authentication / Misc.
const auth = require('./endpoints/auth');
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/logout', auth.logout);
router.post('/send_recovery_email', sendRecoveryEmail);

//------------------------------------------------------------------------
// Users
const users = require('./endpoints/users');
router.get('/users', verifyToken, users.getAll);
router.get('/users/me', verifyToken, users.getMe);
router.get('/users/:id', verifyToken, users.getByID);
router.patch('/users', verifyToken, users.update);
router.patch('/users/update_password', verifyToken, users.updatePassword);
router.patch('/users/reset_password', users.resetPassword);

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
// Games
const games = require('./endpoints/games');
router.get('/games', verifyToken, games.getAll);
router.get('/games/me', verifyToken, games.getMe);
router.get('/games/:id', verifyToken, games.getByID);
router.post('/games', verifyToken, games.create);
router.post('/games/join', verifyToken, games.join);
router.post('/games/invite', verifyToken, games.invite);
router.patch('/games', verifyToken, games.update);
router.delete('/games/:id', verifyToken, games.delete);

//------------------------------------------------------------------------
// D&D Data
const dnd_data = require('./endpoints/dnd_data');
router.get('/dnd/:data_type', dnd_data.getAll);
router.post('/dnd/:data_type', dnd_data.getSpecific);

module.exports = router;
