const express = require('express');
const router = express.Router();

const { verifyToken, sendRecoveryEmail } = require('./endpoints/lib');
const auth = require('./endpoints/auth');
const users = require('./endpoints/users');
const dnd_data = require('./endpoints/dnd_data');

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout);
router.post('/send_recovery_email', sendRecoveryEmail);

router.get('/users', verifyToken, users.getAll);
router.get('/users/me', verifyToken, users.getMe);
router.get('/users/:id', verifyToken, users.getByID);
router.patch('/users', verifyToken, users.update);
router.patch('/users/update_password', verifyToken, users.updatePassword);
router.patch('/users/reset_password', users.resetPassword);

router.get('/dnd/:data_type', dnd_data.getAll);
router.post('/dnd/:data_type', dnd_data.getSpecific);

module.exports = router;
