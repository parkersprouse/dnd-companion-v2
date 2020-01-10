const SparkPost = require('sparkpost');
const { sparkpost_api_key } = require('../config');

const mailer = new SparkPost(sparkpost_api_key);

function sendMail({ subject, html_content, raw_content, addresses }, callback) {
  const recipients = [];
  addresses.forEach((addr) => {
    recipients.push({ address: addr });
  });

  mailer.transmissions.send({
    content: {
      from: 'parker@mail.parkersprouse.me',
      subject,
      html: `<html><body><p>${html_content}</p><p style="margin-top: 2rem">\
             <i>Please do not reply to this e-mail</i></p></body></html>`,
      text: raw_content,
    },
    recipients,
  })
    .then((data) => {
      callback(true);
    })
    .catch((err) => {
      callback(false);
    });
}

module.exports = sendMail;
