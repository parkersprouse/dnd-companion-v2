const express = require('express');
const router = express.Router();

const { verifyToken } = require('./endpoints/lib');
const auth = require('./endpoints/auth');
const users = require('./endpoints/users');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout);

router.get('/users', verifyToken, users.getAll);
router.get('/users/me', verifyToken, users.getMe);
router.get('/users/:id', verifyToken, users.getByID);
router.patch('/users', verifyToken, users.update);
router.patch('/users/password', verifyToken, users.updatePassword);

module.exports = router;
