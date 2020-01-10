const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { validateParams, verifyToken } = require('./lib');

//------------------------------------------------------------------------
// Authentication / Misc.
const auth = require('./controllers/auth');

router.post('/login', [
  check('email').isEmail().withMessage('Your e-mail or password was incorrect'),
  check('password').not().isEmpty().withMessage('Your e-mail or password was incorrect'),
], validateParams, auth.login);

router.post('/register', [
  check('email').isEmail().withMessage('Please make sure your e-mail is valid'),
  check('password').isLength({ min: 8 }).withMessage('Your password must be at least 8 characters'),
  check('password').custom((value, { req }) => value === req.body.confirm_password).withMessage('Please make sure the passwords match'),
], validateParams, auth.register);

router.get('/logout', auth.logout);

//------------------------------------------------------------------------
// Characters
const characters = require('./controllers/characters');

router.get('/characters', verifyToken, characters.getAll);

router.get('/characters/me', verifyToken, characters.getMe);

router.get('/characters/:id', verifyToken, characters.getByID);

router.post('/characters', [
  check('name').not().isEmpty().withMessage('Please make sure your character has a name'),
], validateParams, verifyToken, characters.create);

router.patch('/characters/:id', [
  check('name').custom((value, { req }) => {
    // We only want to validate name if the user is updating it
    const name_present = req.body.name !== undefined;
    if (!name_present) return true;
    return name_present && req.body.name;
  }).withMessage('Please make sure your character has a name'),
], validateParams, verifyToken, characters.update);

router.delete('/characters/:id', verifyToken, characters.delete);

//------------------------------------------------------------------------
// D&D Data
const dnd_data = require('./controllers/dnd_data');

router.get('/dnd/:data_type', dnd_data.getAll);

router.post('/dnd/:data_type', dnd_data.getSpecific);

//------------------------------------------------------------------------
// Games
const games = require('./controllers/games');

router.get('/games', verifyToken, games.getAll);

router.get('/games/own', verifyToken, games.getOwned); // Games you created

router.get('/games/play', verifyToken, games.getPlayed); // Games you play in

router.get('/games/characters/:id', verifyToken, games.getCharacters);

router.get('/games/players/:id', verifyToken, games.getPlayers);

router.get('/games/:id', verifyToken, games.getByID);

router.post('/games', [
  check('name').not().isEmpty().withMessage('Please make sure your game has a name'),
], validateParams, verifyToken, games.create);

router.post('/games/join', [
  check('code').not().isEmpty().withMessage('Please make sure all required fields are filled out'),
  check('character_id').not().isEmpty().withMessage('Please make sure all required fields are filled out'),
], validateParams, verifyToken, games.join);

router.post('/games/invite', [
  check('email').isEmail().withMessage('Please provide an e-mail address'),
  check('code').not().isEmpty().withMessage('No game code provided'),
], validateParams, verifyToken, games.invite);

router.patch('/games', [
  check('name').custom((value, { req }) => {
    // We only want to validate name if the user is updating it
    const name_present = req.body.name !== undefined;
    if (!name_present) return true;
    return name_present && req.body.name;
  }).withMessage('Please make sure your games has a name'),
], validateParams, verifyToken, games.update);

router.delete('/games/:id', verifyToken, games.delete);

//------------------------------------------------------------------------
// Messages
const messages = require('./controllers/messages');

router.get('/messages', verifyToken, messages.getAll);

router.get('/messages/:game_id', verifyToken, messages.getForGame);

router.get('/messages/:game_id/:user_id', verifyToken, messages.getMineForGame);

router.post('/messages', [
  check('body').not().isEmpty().withMessage('Your message cannot be empty'),
], validateParams, verifyToken, messages.create);

router.patch('/messages', [
  check('body').custom((value, { req }) => {
    // We only want to validate body if the user is updating it
    const body_present = req.body.body !== undefined;
    if (!body_present) return true;
    return body_present && req.body.body;
  }).withMessage('Your message cannot be empty'),
], validateParams, verifyToken, messages.update);

router.delete('/messages/:id', verifyToken, messages.delete);

//------------------------------------------------------------------------
// Users
const users = require('./controllers/users');

router.get('/users', verifyToken, users.getAll);

router.get('/users/me', verifyToken, users.getMe);

router.get('/users/:id', verifyToken, users.getByID);

router.post('/users/send_recovery_email', [
  check('email').isEmail().withMessage('Please provide an e-mail address'),
], validateParams, users.sendRecoveryEmail);

router.patch('/users', [
  check('email').isEmail().withMessage('Please make sure your e-mail is valid'),
  check('username').not().isEmpty().withMessage('You must have a username'),
], validateParams, verifyToken, users.update);

router.patch('/users/update_password', [
  check('password').isLength({ min: 8 }).withMessage('Your password must be at least 8 characters'),
  check('password').custom((value, { req }) => value === req.body.confirm_password).withMessage('Please make sure the passwords match'),
], validateParams, verifyToken, users.updatePassword);

router.patch('/users/reset_password', [
  check('pw_reset_key').not().isEmpty().withMessage('No reset key provided'),
  check('password').isLength({ min: 8 }).withMessage('Your password must be at least 8 characters'),
  check('password').custom((value, { req }) => value === req.body.confirm_password).withMessage('Please make sure the passwords match'),
], validateParams, users.resetPassword);

module.exports = router;
