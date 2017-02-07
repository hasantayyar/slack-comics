'use strict';
const request = require('request');
const slack = require('./slack');
const cheerio = require('cheerio');

module.exports = (source) => {
  request.get(source, (err, res, body) => {
    if (err) return console.error(err);
    if (res.statusCode !== 200) {
      return console.error(new Error('Bad status code'));
    }

    const $ = cheerio.load(body);
    const image = $('div#cc-comicbody img');
    const imageSource = image.attr('src');

    const title = image.attr('title');
    console.log('posting to channel');

    const postData = {
      attachments: [{
        'image_url': imageSource.replace(' ','%20'),
      }],
      message: 'Hey! check out today\'s comic. \n\n' + title,
    };
    console.log('Post data ', postData);
    return slack.push(postData, (err, data) => {
      if (err) console.error(err);
      else console.log('posted to channel', data);
    });
  });
};
