module.exports = {

  call(promise) {
    return promise
      .then(data => [null, data])
      .catch(err => {
        raven.captureException(err);
        return [err];
      });
  },

  respond(res, status, message, content) {
    res.status(status).json({ message, content });
  },

};
