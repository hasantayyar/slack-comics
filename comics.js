const request = require('request'),
	config = require('./config'),
	feedParser = require('feedparser'),
	slack = require('./slack'),
	cheerio = require('cheerio');

module.exports = () => {

	var req = request(config.rssList[0]);
	var feedparser = new feedParser([]);

	req.on('error', error => console.log('request error.'));

	req.on('response', (res) => {
		if (res.statusCode !== 200) {
			req.emit('error', new Error('Bad status code'));
		} else {
			req.pipe(feedparser);
		}
	});

	feedparser.on('error', (error) => console.log('parsing error. '));

	feedparser.on('readable', () => {
		var meta = feedparser.meta;
		var item;
		while (item = feedparser.read()) {
			if (item.title && item.description && item.link) {
				let $ = cheerio.load(item.description);
				let firstImage = $('img').first().attr('src');
				console.log('posting to channel')
				slack.push({
					message: title
				}, (err, data) => console.log('posted to channel', data));
			}
		}
	});


};