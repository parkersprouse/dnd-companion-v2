const express = require('express');

const router = express.Router();

function verifyAuth(req) {
  return req.signedCookies.first;
}

router.get('/users', (req, res, next) => {
  console.log(req.headers);
  // res.cookie('first', 'cookievalue', { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false, signed: true });
  if (verifyAuth(req))
    res.status(200).send();
  else {
    res.clearCookie('first');
    res.status(404).send();
  }
});

module.exports = router;
