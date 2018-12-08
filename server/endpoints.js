const express = require('express');
const router = express.Router();

const { call, respond } = require('./utils');

function verifyAuth(req, res, next) {
  //const token = req.headers['authorization'];
  const token = req.signedCookies.token;
  console.log(token);
  if (token) next();
  else {
    res.clearCookie('token');
    res.status(403).send();
  }
}

router.get('/users', verifyAuth, (req, res, next) => {
  console.log(req.headers);
  console.log('Signed cookies:');
  console.log(req.signedCookies);
  console.log('Unsigned cookies:');
  console.log(req.cookies);
  res.status(200).send();
});

router.get('/login', (req, res, next) => {
  res.header('Authorization', 'Bearer abcdefghijklmnopqrstuvwxyz')
  res.cookie('token', 'abcdefghijklmnopqrstuvwxyz', { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, signed: true, secure: false });
  res.status(200).send();
});

module.exports = router;
