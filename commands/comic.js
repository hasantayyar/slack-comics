const request = require('request'),
	config 	= require('../config');

module.exports = function (param) {
	let	channel	= config.channel;

	request(endpoint, function (err, response, body) {
		var info = [];

		if (!err && response.statusCode === 200) {
			body = JSON.parse(body);

			info.push('Gem: ' + body.name + ' - ' + body.info);
			info.push('Authors: ' + body.authors);
			info.push('Project URI: ' + body.project_uri);
		}
		else {
			info = ['No such gem found!'];
		}

		util.postMessage(channel, info.join('\n\n'));
	});

};
