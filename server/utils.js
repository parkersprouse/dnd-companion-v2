const Sentry = require('@sentry/node');

module.exports = {

  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => {
        Sentry.captureException(err);
        return [err];
      });
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

};
