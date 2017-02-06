const request = require('request'),
	feedParser = require('feedparser'),
	slack = require('./slack'),
	cheerio = require('cheerio');

module.exports = (source) => {

	let req = request(source);
	let parser = new feedParser();

	req.on('error', (err) => console.log(err))

	req.on('response', (res) => {
		if (res.statusCode !== 200) {
			return req.emit('error', new Error('Bad status code'));
		}
		req.pipe(parser);
	});

	parser.on('error', (err) => console.log(err));

	parser.on('end', () => console.log('End parsing'));

	parser.on('readable', () => {
		let meta = parser.meta;
		let item = parser.read();
		if (item && item.title && item.description && item.link) {
			let $ = cheerio.load(item.description);
			let firstImage = $('img').first().attr('src');
			console.log('posting to channel')
			slack.push({
				attachments: [{
					image_url: firstImage
				}],
				message: 'Hey! check out today\'s comic. ' + item.title + ' ' + item.link,
			}, (err, data) => console.log('posted to channel', data));
		}
	});

};