const Pusher = require('pusher');
const config = require('./config');

module.exports = () => {
  const pusher = new Pusher({
    appId: config.pusher.id,
    key: config.pusher.key,
    secret: config.pusher.secret,
    cluster: 'us2',
    encrypted: true
  });
  
  pusher.trigger('my-channel', 'my-event', {
    "message": "hello world"
  });
};
