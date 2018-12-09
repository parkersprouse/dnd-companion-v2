const express = require('express');
const router = express.Router();

const { verifyToken } = require('./endpoints/lib');
const auth = require('./endpoints/auth');
const users = require('./endpoints/users');

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/users/:id', verifyToken, users.getByID);

module.exports = router;
