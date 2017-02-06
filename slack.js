var request = require('request');
var config = require('./config');

module.exports.push = (options, next) => {
  request({
    url: config.slack.url,
    method: "POST",
    form: {
      payload: JSON.stringify({
        channel: options.channel || config.slack.channel,
        username: options.username || config.slack.username,
        text: options.message,
        attachments: options.attachments
      })
    },
    qs: {
      token: config.slack.token
    },
    json: true,
    timeout: 2000
  }, (err, response, body) => {
    if (!err && response.statusCode == 200)
      next(null, body);
    else
      next(error || new Error("Unable to send to slack."));

  });
}