const cron = require('node-cron');
const config = require('./config');
const comics = require('./comics');

cron.schedule('* */18 * * *', function() {
	console.log('running a task every 18 hours');
	let source = config.rssList[Math.floor(Math.random() * 10 * config.rssList.length % config.rssList.length)];
	console.log(`Selected ${source}`);
	comics(source);
});